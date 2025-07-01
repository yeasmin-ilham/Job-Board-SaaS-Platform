"use server"
 
import {z} from "zod";
import { User } from "./userRequire"
import { companySchema, jobPostSchema, JobseekerSchema } from "./zodSchema";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./arcjet";
import { request } from "@arcjet/next";

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

            await prisma.jobpost.create({
                data:{
                    jobTitle:validateData.jobTitle,
                    employmentType:validateData.employmentType,
                    location:validateData.location,
                    salaryFrom:validateData.salaryFrom,
                    salaryTo:validateData.salaryTo,
                    jobDescription:validateData.jobDescription,
                    listingDuration:validateData.listingDuration,
                    benefits:validateData.benefits,
                    companyName:validateData.companyName,
                     companyLocation:validateData.companyLocation,
                    companyAbout:validateData.companyAbout,
                    companyLogo:validateData.companyLogo,
                    companyWebsite:validateData.companyWebsite,
                    companyXAccount:validateData.companyXAccount,


                }
            })

            return redirect("/")
          }