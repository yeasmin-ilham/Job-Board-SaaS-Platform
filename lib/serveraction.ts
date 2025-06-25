"use server"
 
import {z} from "zod";
import { User } from "./userRequire"
import { companySchema } from "./zodSchema";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

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