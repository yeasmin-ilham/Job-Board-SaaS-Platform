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
import { MenuBar } from "../TextEditor/MenuBar"


export function JobPostForm(){

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
  benefits:"",
  companyName:"",
  companyLocation:"",
  companyAbout:"",
  companyLogo:"",
  companyWebsite:"",
  companyXAccount:"",
    }
})  



async function onSubmit(data:z.infer<typeof jobPostSchema>){

const [pending, setpending] = useState(false)

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
        <form  className="col-span-1 lg:col-span-2">
        <Card>
           <CardHeader>
            <CardTitle>Job information</CardTitle>
            </CardHeader> 
            <CardContent>
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
                        <FormItem className="mt-3">
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                               <JobDescriptionEditor/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
            </CardContent>
        </Card>
        </form>
     </Form>
     
    )
}