
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/pngegg.png"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

export function Navbar(){
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
                <Button>Login</Button>
            </div>
            
        </nav>
    )
}