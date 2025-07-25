"use server"
 
import {z} from "zod";
import { User } from "./userRequire"
import { companySchema, jobPostSchema, JobseekerSchema } from "./zodSchema";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./arcjet";
import { request } from "@arcjet/next";
import { stripe } from "./stripe";
import { JobDurationArray } from "@/app/components/form/JobListDuration";
import { revalidatePath } from "next/cache";
import { inngest } from "@/app/utils/inngest/client";


// arcjet code , use arcjet to protect my application from attack
const aj = arcjet.withRule(
    shield({
        mode:"LIVE",
    })
).withRule(
    detectBot({
        mode:"LIVE",
        allow:[],
    })
)
// arcjet code end

 export async function CreateCompany(data:z.infer<typeof companySchema>){

    const session= await User();

    // arcjet code
    const req = await request();
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error ("Forbidden");
    }
    // arcjet code end


const validateData = companySchema.parse(data);

 await prisma.user.update({
    where:{
        id:session.id,
    },
    data:{
        onboardingCompleted:true,
        userType:"COMPANY",
        company:{
            create:{
                ...validateData,
            }
        }

    } 
 })
return redirect("/")

 }

      export async function CreateJobseekerForm(data:z.infer<typeof JobseekerSchema>){
            const session = await User();

// arcjet code
                const req = await request();
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error ("Forbidden");
    }
// arcjet code end 

            const validateData = JobseekerSchema.parse(data);

            await prisma.user.update({
                where:{
                    id: session.id,
                },
                data:{
                    onboardingCompleted:true,
                    userType:"JOB_SEEKER",
                    jobseeker:{
                        create:{
                            ...validateData,
                        }
                    }
                }
                
            });
            return redirect("/");
          }


        export async function CreateJobPost(data:z.infer<typeof jobPostSchema>){

        const session = await User();


    // arcjet code
    const req = await request();
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error ("Forbidden");
    }
    // arcjet code end
             
            const validateData = jobPostSchema.parse(data);


            const company = await prisma.company.findUnique({
            where:{
                userId: session.id,
            },
            select:{
                id:true,
                user:{
                    select:{
                        stripeCustomerId:true,
                    }
                }
            }
        })
   
    if(!company?.id){
        return redirect("/")
    }

    let stripeCustomerId=company.user.stripeCustomerId;

if(!stripeCustomerId){
    const customer = await stripe.customers.create({
        email:session.email as string,
        name: session.name as string,
    });
    stripeCustomerId = customer.id;

    await prisma.user.update({
        where:{
            id:session.id,
        },
        data:{
            stripeCustomerId:customer.id,
        }
    })
}


      const jobPost =  await prisma.jobpost.create({
                
                data:{
                    jobTitle:validateData.jobTitle,
                    employmentType:validateData.employmentType,
                    location:validateData.location,
                    salaryFrom:validateData.salaryFrom,
                    salaryTo:validateData.salaryTo,
                    jobDescription:validateData.jobDescription,
                    listingDuration:validateData.listingDuration,
                    benefits:validateData.benefits,
                   companyId:company.id,
                },
                select:{
                    id:true,
                }
            })


           const princingTier = JobDurationArray.find(
            (tier) => tier.day === validateData.listingDuration
           );

           if(!princingTier){
            throw new Error("Invalid Listing Duration Selected")
           }

          await inngest.send({
            name:"job/created",
            data:{
                jobId:jobPost.id,
                expirationDays:validateData.listingDuration,
            }
          })

           const sessionForStripe = await stripe.checkout.sessions.create({
            customer:stripeCustomerId,
            line_items:[
             {
                price_data:{
                    product_data:{
                        name:`Job Posting - ${princingTier.day} Days`,
                        description:princingTier.about,
                        images:[
                            
                            "https://p8mzb4r74x.ufs.sh/f/imJNi9d0bz5uPgJQLFZfVHdaKvps3mhYwMPNIQe8zxlg047k"
                        ],
                    },
                    currency:"USD",
                    unit_amount:princingTier.price * 100,
                },
                quantity:1,
             }
            ],
            metadata:{
                jobId: jobPost.id,
            },

            mode:"payment",
            success_url:`${process.env.NEXT_PUBLIC_URL}/payment/success`,
            cancel_url:`${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
           })

            return redirect(sessionForStripe.url as string)
          }


       export async function SavedJobPost(jobId :string){
                
           const session = await User();

    // arcjet code
    const req = await request();
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error ("Forbidden");
    }
    // arcjet code end

            await prisma.savedJobPost.create({
                data:{
                    jobPostId:jobId ,
                    userId:session.id as string,
                }
            })
            revalidatePath(`/job/${jobId}`)
          }


    export  async function UnSavedJobPost(SavedJobPostId:string){
                
        const session = await User();

    // arcjet code
    const req = await request();
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error ("Forbidden");
    }
    // arcjet code end

        const data = await prisma.savedJobPost.delete({
                where:{
                    id:SavedJobPostId,
                    userId:session.id,
                },
                select:{
                    jobPostId:true,
                }
            })
            revalidatePath(`/job/${data.jobPostId}`)
            
          }

export async function EditJobPost(value:z.infer<typeof jobPostSchema>, jobId:string){
    
         await User();

    
    // arcjet code
    const req = await request();
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error ("Forbidden");
    }
    // arcjet code end

    const validateData = jobPostSchema.parse(value)

    await prisma.jobpost.update({
        where:{
        id:jobId,
        },
        data:{
    jobTitle:validateData.jobTitle,
    employmentType:validateData.employmentType,
    location:validateData.location,
    salaryFrom:validateData.salaryFrom,
    salaryTo:validateData.salaryTo,
    jobDescription:validateData.jobDescription,
    listingDuration:validateData.listingDuration,
    benefits:validateData.benefits,
    
        }
    })

    return redirect("/my-jobs")
}

export async function DeletePost(jobId : string) {

    const session = await User();

        // arcjet code
    const req = await request();
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error ("Forbidden");
    }
    // arcjet code end
    
    await prisma.jobpost.delete({
      where:{
        id:jobId,
        company:{
            userId:session.id
        }
      }
        
    })

    await inngest.send({
        name:"job/cancel.expiration",
        data:{jobId:jobId}
    })

    return redirect("/my-jobs")
}
  

