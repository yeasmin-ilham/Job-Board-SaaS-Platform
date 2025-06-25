"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreateJobseekerForm } from "@/lib/serveraction"
import { UploadDropzone } from "@/lib/uploadthing"
import { JobseekerSchema } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"
import Image from "next/image"
import { XIcon } from "lucide-react"
import { useState } from "react"
import pdf from "@/public/pdf.png";

  export function JobseekerForm(){

    const form = useForm<z.infer<typeof JobseekerSchema>>({
        resolver:zodResolver(JobseekerSchema),
        defaultValues:{
            name:"",
            about:"",
            resume:""
        }
    })

    const [pending,setpending] = useState(false)
 async function submitForm(data:z.infer<typeof JobseekerSchema>){

try{
    setpending(true)
    await CreateJobseekerForm(data)
} catch(error){
    if(error instanceof Error && error.message !== "NEXT_REDIRECT"){
        console.log("something went wrong")
    } 
} finally {
    setpending(false)
}
}

    return(
       <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
          <FormField
        control={form.control}
        name="name"
        render={({field}) =>(
            <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your full name" {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}/>

          <FormField
        control={form.control}
        name="about"
        render={({field}) =>(
            <FormItem>
                <FormLabel>Short Bio</FormLabel>
                <FormControl>
                    <Textarea placeholder="Tell us about yourself...." {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}/>


          <FormField
        control={form.control}
        name="resume"
        render={({field}) =>(
            <FormItem>
                <FormLabel>Upload Resume (PDF)</FormLabel>
                <FormControl>
                    {field.value?(
                   <div className="relative w-fit">
                     <Image
                    src={pdf}
                    width={100}
                    height={100}
                    alt="Resume" className="rounded-lg"
                    />
                          <Button
                        type="button"
                        variant= "destructive"
                        size="icon"
                        className="absolute -top-2 -right-2"
                        onClick={() => field.onChange("")}>
                            <XIcon className="size-4"/>
                        </Button>
                   </div>
                    ):(
                    <UploadDropzone endpoint="resumeUploader"
                    onClientUploadComplete={(res) => {field.onChange(res[0].url)}}
                    className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 
                        ut-label:text-muted-foreground border-primary ut-allowed-content:text-muted-foreground"/>
                    )}
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}/>
        
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending? "Submitting" : "Continue"}
      </Button>
        </form>
       </Form>
    )
 }