"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { countryList } from "@/lib/countryList"
import { CreateJobPost } from "@/lib/serveraction"
import { jobPostSchema } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectValue } from "@radix-ui/react-select"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z} from "zod"
import { SalaryRange } from "./SalaryRange"
import { JobDescriptionEditor } from "../TextEditor/JobDescriptionEditor"
import Image from "next/image"
import { ShowBenefits } from "./ShowBenefits"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { UploadDropzone } from "@/lib/uploadthing"
import { JobDateDuration } from "./JobListDuration"

interface dataProps {
companyData: {
    location: string;
    name: string;
    about: string;
    logo: string;
    website: string;
    xAccount: string;
}

}
 


export function JobPostForm({companyData}: dataProps){

const form = useForm<z.infer<typeof jobPostSchema>>({

    resolver:zodResolver(jobPostSchema),

    defaultValues:{
  jobTitle:"",
  employmentType:"",
  location:"",
  salaryFrom: 0,
  salaryTo:0,
  jobDescription:"",
  listingDuration:30,
  benefits:[],
  companyName:companyData.name,
  companyLocation:companyData.location,
  companyAbout:companyData.about,
  companyLogo:companyData.logo,
  companyWebsite:companyData.website,
  companyXAccount:companyData.xAccount,
    }
})  

const [pending, setpending] = useState(false)

async function onSubmit(data:z.infer<typeof jobPostSchema>){
    try{
        
    setpending(true),
     await CreateJobPost(data)
    } catch (error){
  if(error instanceof Error && error.message !== "NEXT_REDIRECT"){
        console.log("something went wrong")
    } 
    } finally{
    setpending(false)
    }
}
    return(
     
     <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}  className="col-span-1 lg:col-span-2 ">
        <Card>
           <CardHeader>
            <CardTitle className="text-xl font-bold">Job information</CardTitle>
            </CardHeader> 
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Job title" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                     

                    <FormField
                    control={form.control}
                    name="employmentType"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Employment Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select employment type"/>
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Employment Type</SelectLabel>
                                    <SelectItem value="full time">Full Time</SelectItem>
                                    <SelectItem value="part time">Part Time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                <FormField
            control={form.control}
            name="location"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Job Location</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Location"/>
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                 <SelectGroup>
                    <SelectLabel>Worldwide</SelectLabel>
                    <SelectItem value="Worldwide">
                        <span>🌍</span> <span>Worldwide / Remote</span>
                    </SelectItem>
                 </SelectGroup>
                 <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    {countryList.map((country) =>(
                        <SelectItem key={country.code} value={country.name}>
                            <span>{country.flagEmoji}</span>
                            <span className="pl-2">{country.name}</span>
                        </SelectItem>
                    ))}
                 </SelectGroup>
                </SelectContent>
                   </Select>
                    <FormMessage/>
                </FormItem>
            )}
            />

          <FormItem>
            <FormLabel>Salary Range</FormLabel>
            <FormControl>
            <SalaryRange control={form.control} minSalary={10000} maxSalary={1000000} currency="USD" step={2000}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
                </div>

                      <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({field}) =>(
                        <FormItem >
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                               <JobDescriptionEditor field={field as any}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>


                    <FormField
                    control={form.control}
                    name="benefits"
                    render={({field}) =>(
                    <FormItem>
                        <FormLabel>Benefits</FormLabel>
                        <FormControl>
                        <ShowBenefits field={field as any}/>
                        </FormControl>
                    </FormItem>
                    )}/>
            </CardContent>
        </Card>


        <Card className="mt-5">
            <CardHeader>
                <CardTitle className="font-bold text-xl">Company information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

                     <FormField
            control={form.control}
            name="companyName"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Company Name..." {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

                        <FormField
            control={form.control}
            name="companyLocation"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Company Location</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Location"/>
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                 <SelectGroup>
                    <SelectLabel>Worldwide</SelectLabel>
                    <SelectItem value="Worldwide">
                        <span>🌍</span> <span>Worldwide / Remote</span>
                    </SelectItem>
                 </SelectGroup>
                 <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    {countryList.map((country) =>(
                        <SelectItem key={country.code} value={country.name}>
                            <span>{country.flagEmoji}</span>
                            <span className="pl-2">{country.name}</span>
                        </SelectItem>
                    ))}
                 </SelectGroup>
                </SelectContent>
                   </Select>
                    <FormMessage/>
                </FormItem>
            )}
            />

                                 <FormField
            control={form.control}
            name="companyWebsite"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                        <Input placeholder="Company Website..." {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

                    <FormField
            control={form.control}
            name="companyXAccount"
            render={({field}) => (
                <FormItem>
                    <FormLabel> Company X Account</FormLabel>
                    <FormControl>
                        <Input placeholder="Company X Account" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
           
           
                <FormField
            control={form.control}
            name="companyAbout"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Say something about your company..." {...field} className="min-h-[120px]"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

                            <FormField
            control={form.control}
            name="companyLogo"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                   {field.value?(
                     <div className="relative w-fit">
                        <Image
                        src={field.value}
                        width={100}
                        height={100}
                        alt="Image" className="rounded-lg"/>
                        <Button
                        type="button"
                        variant= "destructive"
                        size="icon"
                        className="absolute -top-2 -right-2"
                        onClick={() => field.onChange("")}>
                            <XIcon className="size-4"/>
                        </Button>
                     </div>
                   ) : (     <UploadDropzone endpoint="imageUploader" 
                        onClientUploadComplete={(res) => {field.onChange(res[0].url)}}
                        className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 
                        ut-label:text-muted-foreground border-primary ut-allowed-content:text-muted-foreground"/>)}
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            </CardContent>
        </Card>

        <Card  className="mt-5">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Job Listing Duration</CardTitle>
            </CardHeader>
            <CardContent>

                <FormField
                control={form.control}
                name="listingDuration"
                render={({field}) =>(
                    <FormItem>
                        <FormControl>
                           <JobDateDuration field={field as any}/>
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                )}/>
            </CardContent>
        </Card>
        <Button className="w-full mt-5 mb-3" type="submit" disabled={pending}>
            {pending? "Submitting...": "Post Job"}
        </Button>
        </form>
     </Form>
     
    )
}