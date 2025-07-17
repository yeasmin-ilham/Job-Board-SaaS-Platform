import { CompanyCard } from "@/app/components/form/CompanyCard";
import { NoJobcard } from "@/app/components/form/NoJobcard";
import { prisma } from "@/lib/prisma"
import { User } from "@/lib/userRequire"


async function getData(userId : string){
    const data = await prisma.savedJobPost.findMany({
        where:{
           userId:userId,
        },
        select:{
            id:true,
            jobPost:{
                select:{
 jobTitle:true,
  employmentType:true,
  location:true,
  salaryFrom:true,
  salaryTo:true,
  jobDescription:true,
  listingDuration:true,
  id:true,
  createdAt:true,
  company:{
    select:{
        name:true,
        logo:true,
        about:true,
        location:true,
    }
  }
                }
            }
        }
    })

    return data
}

export  default async function favourites(){
    const session = await User();
    const data =  await getData(session.id as string);
   

     if(data.length === 0){
return(
        <>
        <div className="mt-20">
             <NoJobcard title="No Favourites found" about="You don't have any
              favourites job yet, select some job as favourites" buttontext="Find a job" link="/"/>
        </div>
        </>
    )
     } else{
        return(
            <>
            <div className="grid grid-cols-1 mt-5 gap-4">
                      {data.map((job) =>(
                <CompanyCard postData={job.jobPost} key={job.jobPost.id}/>
                
            ))}
            </div>
            </>
        )
     }

    
}