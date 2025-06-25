
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/pngegg.png"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { auth, signOut } from "@/lib/auth";

export async function Navbar(){
    const session = await auth();

    return(
        <nav className="flex justify-between items-center py-5">
            <Link href="/" className="flex gap-2 items-center">
            <Image
            src={Logo}
            width={40}
            height={40}
            alt="image"/>
            <h1 className="text-2xl font-bold">Job<span className="text-primary">Ilham</span></h1>
            </Link>
            <div className="space-x-4 flex items-center">
                <ModeToggle/>
                {session?.user? (<form action={async() =>{
                    "use server"
                    await signOut({redirectTo:("/")})
                }}>
                    <Button >Logout</Button>
                </form>) : 
                (<Link href="http://localhost:3000/login"><Button variant="outline">Login</Button></Link>)}
            </div>
            
        </nav>
    )
}