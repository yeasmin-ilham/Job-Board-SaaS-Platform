
import { NoJobcard } from "@/app/components/form/NoJobcard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma"
import { User } from "@/lib/userRequire";
import { CopyCheck, CopyCheckIcon, MoreHorizontal, PenBox, PenBoxIcon, PlayCircle, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(userId:string) {
    const data = await prisma.jobpost.findMany({
        where:{
            company:{
                userId:userId,
            },
            
        },
        select:{
            id:true,
            jobTitle:true,
            status:true,
            createdAt:true,
            company:{
                select:{
                    name:true,
                    logo:true,
                }
            }
        },

        orderBy:{
            createdAt:"desc"
        }
    })
    return data;
}


export default async function myJob(){
        const session = await User()
    const data = await getData(session.id as string)
    return(
        <>
        {data.length === 0 ? (
            <NoJobcard title="No job post found" about="You don't have any job posts yet" buttontext="Create a job post now!" link="/post-job"/>
        ):(
            <Card>
                <CardHeader>
                    <CardTitle>My Jobs</CardTitle>
                    <CardDescription>
                        Manage your job listings and applications here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Logo</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                          {data.map((job) => (
                         <TableRow key={job.id}>
                          <TableCell>
                            <Image
                            src={job.company.logo}
                            width={40}
                            height={40}
                            alt="Image"/>
                          </TableCell>
                          <TableCell>{job.company.name}</TableCell>
                          <TableCell>{job.jobTitle}</TableCell>
                          <TableCell>{job.status}</TableCell>
                          <TableCell>{job.createdAt.toLocaleDateString("en-US",{
                            month:"long",
                            day:"numeric",
                            year:"numeric"
                          })
                          }</TableCell>

                              <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/my-jobs/${job.id}/edit`}>
                            <PenBoxIcon/> 
                            Edit Job
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                        <Link href={`/my-jobs/${job.id}/copy`}>
                              <CopyCheckIcon/> 
                            Copy Job URL
                        </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>

                        <DropdownMenuItem asChild>
                           <Link href={`/my-jobs/${job.id}/delete`}>
                            <XCircle/> 
                            Delete Job
                           </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                   </TableCell>
                        </TableRow>
                            ))}
               
                    </TableBody>
                 </Table>
                </CardContent>
                
            </Card>
        )}
        </>
    )
}