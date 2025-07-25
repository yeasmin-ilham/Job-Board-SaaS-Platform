"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem,
     SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { countryList } from "@/lib/countryList";
import { XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";




const jobTypes = [
    {id:0,type:"full time"},
    {id:1,type:"part time"},
    {id:2,type:"contract"},
    {id:3,type:"internship"}
]


export function FilterCard(){

        const router = useRouter();
        
        const searchParams = useSearchParams();

        const currentJobTypes = searchParams.get("jobTypes")?.split(",") || []
        const currentLocation = searchParams.get("location") || "";

        function clearAllFilter(){
            router.push("/")
    }

                const createQueryString = useCallback(
                (name: string , value: string) =>{
                    const params = new URLSearchParams(searchParams.toString())

                    if(value){
                        params.set(name, value)
                    } else {
                        params.delete(name)
                    }

                    return params.toString()
                },
                [searchParams]
            )
        
   function handleJobType(jobTypes:string, checked:boolean){
        const current = new Set(currentJobTypes);
        if(checked){
            current.add(jobTypes)
        }else{
            current.delete(jobTypes)
        }

        const newValue = Array.from(current).join(",");
        router.push(`?${createQueryString('jobTypes' , newValue)}`)
    }


function handleLocationChange(location: string){
    router.push( `?${createQueryString('location' , location)}`)
}

    return(
        <div>
                    <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <p className="text-xl font-bold">Filter</p>
                    <Button onClick={clearAllFilter} variant="destructive" size="sm" className="h-8">Clear All <XIcon/> </Button>
            </CardHeader>
            <Separator/>
            <CardContent className="space-y-6">
                <p className=" mt-2 text-lg">Job Type</p>
                <div className="grid grid-cols-2 mt-3">
                    {jobTypes.map((job) => 
                <div key={job.id} className="flex items-center gap-2" >
                    <Checkbox onCheckedChange={(checked) => {
                       handleJobType(job.type ,  checked as boolean)
                    }} id={job.type}
                   
                    checked={currentJobTypes.includes(job.type)} />
                <Label className="text-sm font-medium" htmlFor={job.type}>
                    {job.type}
                </Label>
                </div>
                )}
                </div>
                <Separator/>

                <div className="space-y-4">
                    <p className="text-lg">Location</p>

                <Select onValueChange={(location) =>{
                handleLocationChange(location)
                }} value={currentLocation}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Location"/>
                    </SelectTrigger>
               
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
                </div>
            </CardContent>
        </Card>
        </div>
    )
}