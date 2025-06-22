
import { companySchema } from "@/lib/zodSchema"
import { useForm } from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countryList } from "@/lib/countryList"
import { Textarea } from "@/components/ui/textarea"
import { UploadDropzone } from "@/lib/uploadthing"
import { useState } from "react"



export function CompanyForm(){
    const[image,setimage] = useState("")
    const [firstpage,setfirstpage] = useState()
const form = useForm<z.infer<typeof companySchema>>({
    resolver:zodResolver(companySchema),
    defaultValues:{
      name:"",
      location:"",
      about:"",
      logo:"",
      website:"",
      xAccount:""  
    }
})
    return(
        <Form {...form}>
        <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
            <FormField
            control={form.control}
            name="name"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter Company Name" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            >
            </FormField>

            <FormField
            control={form.control}
            name="location"
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
            >
            </FormField>
            
           
                     <FormField
            control={form.control}
            name="website"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                        <Input placeholder="https://yourcompany.com" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            >
            </FormField>
                     <FormField
            control={form.control}
            name="xAccount"
            render={({field}) => (
                <FormItem>
                    <FormLabel>X (Twitter) Account</FormLabel>
                    <FormControl>
                        <Input placeholder="@yourcompany" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            >
            </FormField>
            </div>

                <FormField
            control={form.control}
            name="about"
            render={({field}) => (
                <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Tell us about your company..." {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            >
            </FormField>

                <FormField
            control={form.control}
            name="logo"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                        <UploadDropzone endpoint="imageUploader" 
                        onClientUploadComplete={(res) => {field.onChange(res[0].url)}}
                        className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground border-primary ut-allowed-content:text-muted-foreground"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            >
            </FormField>
            
        </form>
        </Form>
    )
}