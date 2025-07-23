"use client"

import { Card, CardContent} from "@/components/ui/card"
import Logo from "@/public/pngegg.png"
import Image from "next/image"
import { useState } from "react"
import { OnboardingFirstPage } from "./OnboardingFirstPage"
import { CompanyForm } from "./Companyform"
import { JobseekerForm } from "./Jobseekerform"

export function Onboardingform(){

    type UserSelectionType = 'company'| 'jobseeker' | null

    const [step , setstep] = useState(1);
    const [userType, setuserType] = useState<UserSelectionType>(null)

    function handleUserSelection(type:UserSelectionType){
    setuserType(type)
    setstep(2)
    }

    function renderstep (){
        if(step === 1){
            return <OnboardingFirstPage onSelect={handleUserSelection}/>
        } else{
            return userType === "company"? (
                <CompanyForm/>
            ) : (
                <JobseekerForm/>
            )
        }
    }
    return(
        <>
        <div className="flex gap-2 items-center mb-9">
        <Image src={Logo} width={50} height={50} alt="Image"
        />
        <h1 className="text-4xl font-bold">Job<span className="text-primary">Ilham</span></h1>
        </div>
        <Card className="max-w-2xl w-full ">
           <CardContent className="p-6">
            {renderstep()}
           </CardContent>
            
        </Card>
        </>
    )
}