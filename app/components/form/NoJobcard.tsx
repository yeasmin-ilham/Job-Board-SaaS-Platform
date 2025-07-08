import { buttonVariants } from "@/components/ui/button";

import { Ban, PlusCircle} from "lucide-react";
import Link from "next/link";

interface iAppProps{
    title:string;
    about:string;
    buttontext:string;
}

export function NoJobcard({title,about, buttontext}: iAppProps){
    return(
      <>
    
      <div className="space-y-6 flex flex-col h-full items-center justify-center p-8 flex-1 border border-dashed rounded-md bg-primary/5">
          <div className="size-20 flex items-center justify-center rounded-full bg-primary/10">
            <Ban className="size-10 text-primary" />
          </div>
      <div>
            <p className="text-xl font-semibold text-center">{title}</p>
          <p className="text-sm text-muted-foreground max-w-sm text-balance tracking-tigh text-center"> {about}</p>
      </div>
          <Link href="/" className={buttonVariants()}>
          <PlusCircle/> {buttontext}
          </Link>
      </div>
      
      </>
    )
}