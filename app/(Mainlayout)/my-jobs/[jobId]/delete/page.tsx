
import { Button, buttonVariants } from "@/components/ui/button";
import { Card,CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeletePost } from "@/lib/serveraction";
import { User } from "@/lib/userRequire";
import { ArrowLeft, TrashIcon } from "lucide-react";

import Link from "next/link";

export default async function DeletJob({params}: {params: Promise<{jobId:string}> }){
        const {jobId} = await params;
        await User();
    return(
            <div>
                       <Card className="max-w-lg mx-auto mt-28">
        <CardHeader className="flex flex-col justify-center space-y-2">
            <CardTitle className="text-xl font-bold">Are you absolutely sure?</CardTitle>
            <CardDescription className="text-muted-foreground max-w-sm text-balance tracking-tight text-sm">This action cannot be undone. This will permanently 
                delete your JobPost and remove your data from our servers.</CardDescription>
        </CardHeader>
        <CardFooter>
<div className="flex flex-row items-center space-x-64">
                <Link href="/my-jobs" className={buttonVariants()}>
                <ArrowLeft/>
                 Cancel
                </Link>
                <form 
              action={ async () => {
                "use server"
                await DeletePost(jobId)
               }} 
                 >
               <Button variant="destructive">
                <TrashIcon/>
                Delete
                </Button>
                </form>
            
</div>
        </CardFooter>
       </Card>
            </div>
    )}
