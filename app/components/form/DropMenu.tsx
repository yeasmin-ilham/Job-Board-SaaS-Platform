import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Heart, Layers2,  LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";
import Link from "next/link";

    interface iAppProps {
        name:string,
        image:string,
        email:string;
    }

export async function DropMenu({name,image, email} : iAppProps){
    

    return(
    
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                        <Avatar>
                            <AvatarImage src={image} alt="Profile Image"/>
                           <AvatarFallback>{name.slice(0,3)}</AvatarFallback>
                        </Avatar>
                        <ChevronDown size={16} strokeWidth={2} className="ml-2 opacity-60" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-50" align="end">
                   <DropdownMenuLabel className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{name}</span>
                    <span className="text-xs text-muted-foreground">{email}</span>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator/>
                   <DropdownMenuGroup>
             <DropdownMenuItem asChild>
                    <Link href="/favourites">
                     <Heart size={16} strokeWidth={2} className="opacity-60" /> 
                     <span> Favourite Jobs</span>
                    </Link>
             </DropdownMenuItem>
             <DropdownMenuItem asChild>
                  <Link href="/my-jobs">
                     <Layers2 size={16} strokeWidth={2} className="opacity-60"/> 
                     <span>My Job Listings</span>
                  </Link>
             </DropdownMenuItem>
             </DropdownMenuGroup>

             <DropdownMenuSeparator/>
             <DropdownMenuItem asChild>
               <form
                  action={async () => {
        "use server"
        await signOut({redirectTo:"/"})
      }}
      >
                <button className="flex w-full items-center gap-2">
                    <LogOut size={16} strokeWidth={2} className="opacity-60"/> 
                     <span>Logout</span>
                </button>
               </form>
             </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        
    )
}