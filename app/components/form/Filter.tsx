import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { countryList } from "@/lib/countryList";
import { XIcon } from "lucide-react";


const jobType = [
    {id:0,type:"Full-time"},
    {id:1,type:"Part-time"},
    {id:2,type:"Contract"},
    {id:3,type:"Internship"}
]


export function FilterCard(){
    return(
        <div>
                    <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <p className="text-xl font-bold">Filter</p>
                    <Button variant="destructive">Clear All <XIcon/> </Button>
            </CardHeader>
            <Separator/>
            <CardContent className="space-y-6">
                <p className=" mt-2 text-lg">Job Type</p>
                <div className="grid grid-cols-2 mt-3">
                    {jobType.map((type) => 
                <div key={type.id} className="flex items-center gap-2" >
                    <Checkbox />
                <p>{type.type}</p>
                </div>
                )}
                </div>
                <Separator/>

                <div className="space-y-4">
                    <p className="text-lg">Location</p>

                <Select>
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