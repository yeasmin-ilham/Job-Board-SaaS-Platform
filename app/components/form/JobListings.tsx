import { prisma } from "@/lib/prisma"
import { CompanyCard } from "./CompanyCard";
import { NoJobcard } from "./NoJobcard";
import { MainPagenation } from "./MainPagenation";
import { JobPostStatus } from "@prisma/client";

   async function getData({page = 1, pageSize = 2, jobTypes = [], location= "" } : {
    page: number, pageSize:number, jobTypes:string[], location:string;
   }){
    const skip = (page - 1) * pageSize

    const where = {
      status:JobPostStatus.ACTIVE,
      ...(jobTypes.length> 0 && {
        employmentType:{
          in:jobTypes,
        }
      }),
      ...(location && location !== "worldwide" && {
        location:location,
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
            status:"ACTIVE",
          },
        }),
]);

        return{
          jobs:data,
          totalPages:Math.ceil(totalCount/pageSize)
        }
     }

export async function JobListingsCard({currentPage , jobTypes , location} : {currentPage : number, jobTypes: string[], location:string}){
    
const {jobs , totalPages} = await getData({page: currentPage , pageSize:2, jobTypes: jobTypes , location:location});

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