
import { FilterCard } from "../components/form/Filter";
import { JobListingsCard } from "../components/form/JobListings";



type SearchParams = {
  searchParams: Promise<{
   page? : string;
   jobTypes?:string;
   location?:string;
}>
  
}

export default async function Home({searchParams}: SearchParams){
       const params = await searchParams;
       const currentPage = Number(params.page) || 1 
           const jobTypes = params.jobTypes?.split(",") || []
           const location = params.location || "";
    return(
       <>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> 
        <FilterCard/>
        
       <div className="col-span-2 flex flex-col gap-6">
          <JobListingsCard currentPage={currentPage} jobTypes={jobTypes} location={location}/>
       </div>
        </div> 
       
       </>
    )
}