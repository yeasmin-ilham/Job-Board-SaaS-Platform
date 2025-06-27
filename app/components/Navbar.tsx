
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/pngegg.png"
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { auth } from "@/lib/auth";
import { DropMenu } from "./form/DropMenu";

export async function Navbar(){
    const session = await auth();

    return(
        <nav className="flex justify-between items-center py-5">
            <Link href="/" className="flex gap-2 items-center">
            <Image
            src={Logo}
            width={40}
            height={40}
            alt="image" />
            <h1 className="text-2xl font-bold ">Job<span className="text-primary">Ilham</span></h1>
            </Link>
         
         <div className="hidden md:flex items-center gap-5">
            <ModeToggle/>
            <Link href="/post-job" className= {buttonVariants({size:"lg"})}>Post Job</Link>
            
            {session?.user? (
                <DropMenu name={session.user.name as string}
                            image={session.user.image as string}
                            email={session.user.email as string}/>
            ):(
             
                <Link href="/login" className={buttonVariants({size:"lg" , variant:"outline"})}> Login</Link>
            )}
        
         </div>
            
        </nav>
    )
}