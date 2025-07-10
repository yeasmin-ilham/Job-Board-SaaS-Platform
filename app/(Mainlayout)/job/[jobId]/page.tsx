import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma"
import { Heart } from "lucide-react";

import { notFound } from "next/navigation";


async function getData(jobId:string){
    const data = prisma.jobpost.findUnique({
        where:{
            status:"DRAFT",
            id:jobId,
            
        },
        select:{
  id : true,
  jobTitle : true,
  employmentType : true,
  location : true,
  createdAt:true,
  jobDescription : true,
  benefits : true,
  company:{
    select:{
  name :true,
  location :true,
  about :true,
  logo :true,
    }
  }
        }
        
    })
    if(!data){
        return notFound();
    }
    return data;
}

type Params = Promise<{jobId:string}> ;
export default async function Job({params} : {params : Params }){
     
    const {jobId} =  await params;
    const data = await getData(jobId);
 

    return(
    <>
    <div className="grid grid-cols-[1fr, 400px] gap-8">
   <div className="space-y-8">
    <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold">Marketing Manager</h1>
            <div className="flex gap-2 items-center mt-2">
                <p className="font-medium">data.jobtitle</p>
                <span className="inline text-muted-foreground">*</span>
                <Badge className="rounded-full" variant="secondary">data.emploment</Badge>
                <span className="inline text-muted-foreground">*</span>
                <Badge className="rounded-full">data.location</Badge>
            </div>
        </div>

        <Button variant="outline">
            <Heart className="size-4"/>
            Save Job
        </Button>
    </div>
    <section>
        <p>description...</p>
    </section>
    </div>
    </div>
    </>
    )
}