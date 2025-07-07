import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check} from "lucide-react";
import Link from "next/link";

export default function SuccessPaymen(){
    return(
        <>
        <div className=" min-h-[550px] flex justify-center items-center">
        <Card className="flex flex-col items-center justify-center text-center max-w-sm p-6 bg-green-500/10">
    
                <Check className="size-12 p-2 bg-green-500/35 text-green-500 rounded-full" />
        <CardHeader>
            <CardTitle className="font-bold text-xl">Payment Successfull</CardTitle>
            <CardDescription className="text-muted-foreground text-sm tracking-tight">
                Congrats your payment was Successfull.Your job posting is now active.
            </CardDescription>
        </CardHeader>
        <Button className="w-full" asChild>
            <Link href="/">Go back to Homepage</Link>
        </Button>
        </Card>
        </div>
        </>
    )
}