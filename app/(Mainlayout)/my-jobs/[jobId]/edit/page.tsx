import { prisma } from "@/lib/prisma"
import { EditJobForm } from "@/app/components/form/EditJobForm"
import { notFound } from "next/navigation";
import { User } from "@/lib/userRequire";


async function getData(jobId:string, userId : string) {
    const data = await prisma.jobpost.findUnique({
        where:{
          id:jobId,
          company:{
            userId:userId
          }
        },
        select:{
  id:true,
  jobTitle:true,
  employmentType:true,
  location:true,
  salaryFrom:true,
  salaryTo:true,
  jobDescription:true,
  listingDuration:true,
  benefits:true,
  company:{
    select:{
  name:true,
  location:true,
  about:true,
  logo:true,
  website:true,
  xAccount:true,
    }
  }
        }
    })

    if(!data){
        return notFound();
    }

    return data;
    
}

export default async function EditJob({params} : {params : Promise<{jobId:string}> }){
    const {jobId} = await params
    const session = await User();
    const jobInfo = await getData(jobId, session.id as string)
    return(
          <EditJobForm data={jobInfo}/>
    )
}