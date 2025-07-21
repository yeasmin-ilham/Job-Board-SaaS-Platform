import { benefits } from "@/app/components/form/BenefitsArray";
import { JsonToHtml } from "@/app/components/JsonToHtml";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import arcjet, { detectBot } from "@/lib/arcjet";
import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma"
import { SavedJobPost, UnSavedJobPost } from "@/lib/serveraction";
import { cn } from "@/lib/utils";
import { request } from "@arcjet/next";


import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


const aj = arcjet.withRule(
       detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"
      ],
    }),
)


async function getData(jobId:string , userId? : string){

const [data , savedJob ] = await Promise.all([

    await prisma.jobpost.findUnique({
        where:{
            
            id:jobId,
            status:"ACTIVE"
            
        },
        select:{
  id : true,
  jobTitle : true,
  employmentType : true,
  location : true,
  createdAt:true,
  jobDescription : true,
  benefits : true,
  listingDuration:true,
  company:{
    select:{
  name :true,
  location :true,
  about :true,
  logo :true,
    }
  }
        }
        
    }),

    userId? 

     prisma.savedJobPost.findUnique({
        where:{
            jobPostId_userId:{
                userId:userId, 
                jobPostId:jobId,
            }
        },
        select:{
            id: true,
        }
    }) : null
])

    if(!data){
        return notFound();
    }
    return {data , savedJob};
   
}
 



export default async function Job({params}: {params: Promise<{ jobId : string }>}){
     
  const {jobId} = await params;

    // arcjet code
    const req = await request();
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error ("Forbidden");
    }
    // arcjet code end
     const session = await auth();
    const {data, savedJob} = await getData(jobId , session?.user?.id );
    
        
    return(
    <>
    <div className="grid lg:grid-cols-3 gap-8">
   <div className="space-y-8 col-span-2">
    <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold">{data.jobTitle}</h1>
            <div className="flex gap-2 items-center mt-2">
                <p className="font-medium">{data.company.name}</p>
                <span className="inline text-muted-foreground">*</span>
                <Badge className="rounded-full" variant="secondary">{data.employmentType}</Badge>
                <span className="inline text-muted-foreground">*</span>
                <Badge className="rounded-full">{data.location}</Badge>
            </div>
        </div>


        {session?.user? (
        <form action={savedJob?  UnSavedJobPost.bind(null, savedJob.id ) : SavedJobPost.bind(null, jobId)}>
            <SubmitButton savedJob={!!savedJob}/>
        </form>
        ) : (
           <Link href="/login" className={buttonVariants({variant:"outline"})}>
           <Heart className="size-4"/>
           Save Job
           </Link> 
        )}
        

    </div>
    <section>
        <JsonToHtml json={JSON.parse(data.jobDescription as string)}/>
    </section>
    <section>
<div className="font-semibold mb-4 flex gap-1">
            <h3 >
            Benefits
        </h3>
        <span className="text-muted-foreground text-sm font-normal">(green is offered)</span>
</div>
        <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) =>{
                        const isOffered = data.benefits.includes(benefit.id);
                        return(
                          <Badge className={cn(
                            isOffered? "" : "opacity-75 cursor-not-allowed", "text-sm px-4 py-1.5 rounded-full"
                          )} 
                          key={benefit.id}
                          variant={isOffered?"default" : "outline"}>
                    <span className="flex items-center gap-2 ">
                        {benefit.icon}
                        {benefit.label}
                    </span>
                </Badge> 
)})}
        </div>
    </section>
    </div>
    
    <div className="space-y-6">
        <Card className="p-6">
        <div className="space-y-4">
        <div>
                <h3 className="font-semibold">Apply now</h3>
            <p className="text-sm text-muted-foreground mt-1">Please 
                let {data.company.name} know you found this job on 
                jobIlham. This helps us grow !</p>
        </div>
        <Button className="w-full">Apply now</Button>
        </div>
        </Card>

        <Card className="p-6">
        <h3 className="font-semibold" >About the Job</h3>
        <div>
            <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Apply before</span>
                <span className="text-sm"> {new Date(data.createdAt.getTime() + data.listingDuration  * 24 *60 * 60 * 1000).toLocaleDateString("en-US", {
                    month:"long",
                    day:"numeric",
                    year:"numeric",
                })}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-sm text-muted-foreground"> Posted on</span>
                <span className="text-sm">{data.createdAt.toLocaleDateString("en-US",{
                    month:"long",
                    day:"numeric",
                    year:"numeric",
                })}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Employment Type</span>
                <span className="text-sm">{data.employmentType}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm"> {data.location}</span>
            </div>
        </div>
        </Card>
        <Card className="p-6">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Image
                    src={data.company.logo}
                    width={48}
                    height={48}
                    alt="Image"
                    className="rounded-full size-12"/>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{data.company.name}</h3>
                        <p className=" text-sm text-muted-foreground line-clamp-3">{data.company.about}</p>
                    </div>
                </div>
            </div>
        </Card>
    </div>
    </div>
    </>
    )
}