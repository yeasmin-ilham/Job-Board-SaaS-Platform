
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
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { CreateCompany } from "@/lib/serveraction"
import { useFormStatus } from "react-dom"




export function CompanyForm(){




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

  async function onSubmit(data:z.infer<typeof companySchema>){
try {
    
    await CreateCompany(data)
} catch(error){
    if(error instanceof Error && error.message !== "NEXT_REDIRECT"){
        console.log("something went wrong")
    } 
}
  } 

  const {pending} = useFormStatus();

    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            >
            </FormField>

            <Button className="w-full " type="submit" disabled={pending}>
                {pending? "Submitting..." : "Continue"}
            </Button>
            
        </form>
        </Form>
    )
}