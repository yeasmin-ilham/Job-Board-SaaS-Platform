import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XIcon} from "lucide-react";
import Link from "next/link";

export default function SuccessPaymen(){
    return(
        <>
        <div className=" min-h-[550px] flex justify-center items-center">
        <Card className="flex flex-col items-center justify-center text-center max-w-sm p-6 bg-red-500/10">
    
                <XIcon className="size-12 p-2 bg-red-500/35 text-red-500 rounded-full" />
        <CardHeader>
            <CardTitle className="font-bold text-xl">Payment Cancelled</CardTitle>
            <CardDescription className="text-muted-foreground text-sm tracking-tight">
                NO worries, You won't be charged. Please try again! Are you sure want to cancel?
            </CardDescription>
        </CardHeader>
        <Button className="w-full" asChild variant="destructive">
            <Link href="/">Go back to Homepage</Link>
        </Button>
        </Card>
        </div>
        </>
    )
}