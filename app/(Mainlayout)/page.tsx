
import {  NoJobcard } from "../components/form/NoJobcard";
import { prisma } from "@/lib/prisma";
import { FilterCard } from "../components/form/Filter";
import { CompanyCard } from "../components/form/CompanyCard";



   async function getData(){
        const data = await prisma.jobpost.findMany({
            where:{
                status:"DRAFT"
            },
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
        });
        return data;
     }



export default async function Home(){
       const jobpostData = await getData();
       
        
       
    return(
       <>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> 
        <FilterCard/>

       <div className="col-span-2">
       {jobpostData.length>0? (

       <div className="flex flex-col gap-6">
        {jobpostData.map((job) =>(
             <CompanyCard key={job.id} postData={job}/>
        ))}
       </div>
       ) :
       (
         <NoJobcard title="NO Jobs found" about="Try searching for a
         different job title or location." buttontext="Clear all filters" link="/"/>
       )}
       </div>

        </div>  
       </>
    )
}