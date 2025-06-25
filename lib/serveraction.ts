"use server"
 
import {z} from "zod";
import { User } from "./userRequire"
import { companySchema, JobseekerSchema } from "./zodSchema";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import pdf from "@/public/pdf.png";


 export async function CreateCompany(data:z.infer<typeof companySchema>){

    const session= await User();

const validateData = companySchema.parse(data);

 await prisma.user.update({
    where:{
        id:session.id,
    },
    data:{
        onboardingCompleted:true,
        userType:"COMPANY",
        Company:{
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

            const validateData = JobseekerSchema.parse(data);

            await prisma.user.update({
                where:{
                    id: session.id,
                },
                data:{
                    onboardingCompleted:true,
                    userType:"JOB_SEEKER",
                    Jobseeker:{
                        create:{
                            ...validateData,
                        }
                    }
                }
                
            });
            return redirect("/");
          }