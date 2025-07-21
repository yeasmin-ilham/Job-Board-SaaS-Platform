"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import { Link2 } from "lucide-react";
import { toast } from "sonner";


   interface CopyJob{
        url:string
    }
export function CopyJob({url}: CopyJob){

   async function handleCopyJob(){
      try{
        await  navigator.clipboard.writeText(url)
        toast.success("URL copied to clipboard")
      } catch(err){
        console.log(err)
        toast.error("Failed to copy url")
      }
    }
    return(
                  <DropdownMenuItem asChild onSelect={handleCopyJob}
                  >
                          <div>
                            <Link2/> 
                            <span>Copy Job URL</span>
                            <Toaster/>
                          </div>
                        </DropdownMenuItem>
    )
}