import { prisma } from "@/lib/prisma";
import { Onboardingform } from "../components/form/Onboardingform";
import { redirect } from "next/navigation";
import { User } from "@/lib/userRequire";

  async function checkUserCompleteOnboarding(usreId:string){
        const user = await prisma.user.findUnique({
            where:{
                id:usreId,
            },
            select:{
                onboardingCompleted:true,
            }
        })

        if(user?.onboardingCompleted === true){
            return redirect("/")
        }
        return user;
     }

export default async function onboarding(){
    const session = await User();

 await checkUserCompleteOnboarding(session.id as string)
    return(
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
  
        <Onboardingform/>
    </div>
    )
}