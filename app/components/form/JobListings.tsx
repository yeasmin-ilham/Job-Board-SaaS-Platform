import { prisma } from "@/lib/prisma"
import { CompanyCard } from "./CompanyCard";
import { NoJobcard } from "./NoJobcard";
import { MainPagenation } from "./MainPagenation";
import { JobPostStatus } from "@prisma/client";

   async function getData({page = 1, pageSize = 2, jobTypes = [] } : {
    page: number, pageSize:number, jobTypes:string[]
   }){
    const skip = (page - 1) * pageSize

    const where = {
      status:JobPostStatus.DRAFT,
      ...(jobTypes.length> 0 && {
        employmentType:{
          in:jobTypes,
        }
      })
    }

const [data, totalCount] = await Promise.all([
           prisma.jobpost.findMany({
            where: where,
            take:pageSize,
            skip:skip,
            select:{
   id:true,             
  jobTitle:true,
  employmentType:true,
  location:true,
  salaryFrom:true,
  salaryTo:true,
  createdAt:true,
  company:{
    select:{
        name:true,
        location:true,
        about:true,
        logo:true,
    }
  }
            },
       orderBy:{
        createdAt:"desc"
       }
        }),

        prisma.jobpost.count({
          where:{
            status:"DRAFT",
          }
        })
])

        return{
          jobs:data,
          totalPages:Math.ceil(totalCount/pageSize)
        }
     }

export async function JobListingsCard({currentPage , jobTypes} : {currentPage : number, jobTypes: string[]}){
    
const {jobs , totalPages} = await getData({page: currentPage , pageSize:2, jobTypes: jobTypes});

return(
<>
       {jobs.length>0? (

       <div className="flex flex-col gap-6">
        {jobs.map((job) =>(
             <CompanyCard key={job.id} postData={job}/>
        ))}
       </div>
       ) :
       (
         <NoJobcard title="NO Jobs found" about="Try searching for a
         different job title or location." buttontext="Clear all filters" link="/"/>
       )}
         <div className="flex justify-center mt-6">
          <MainPagenation totalPages={totalPages} currentPage={currentPage} />
        </div>
        </>
)
}