import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo0 from "@/public/pngegg (1).png"
import Logo1 from "@/public/pngegg (11).png"
import Logo2 from "@/public/pngegg (3).png"
import Logo3 from "@/public/pngegg (4).png"
import Logo4 from "@/public/pngegg (10).png"
import Logo5 from "@/public/pngegg (8).png"
import Image from "next/image";
import { JobPostForm } from "@/app/components/form/JobpostForm";



const company = [
    {id:0, name:"NovaNest", logo:Logo0},
    {id:1, name:"CodeHaven", logo:Logo1},
    {id:2, name:"PixelBloom", logo:Logo2},
    {id:3, name:"StackHive", logo:Logo3},
    {id:4, name:"CorePulse", logo:Logo4},
    {id:5, name:"NextSphere", logo:Logo5}
]


const testimonial = [

    {
        quote:"Success in business isn’t just about making money, it’s about making a difference.",
        author:"Yeasmin Ilham",
        company:"MaryKay"
    },

    {
        quote:"A brand for a company is like a reputation for a person. You earn a reputation by trying to do hard things well.",
        author:"Azad Rahman",
        company:"NextSphere",
    },

    {
        quote:"Great companies are built on great products, stronger teams, and unwavering trust.",
        author:"Mark Johnson",
        company:"PixelBloom",
    }
]

const stats = [
    {id:0, value:"10k+", label:"Monthly Active Job seekers"},
    {id:1, value:"48h", label:"Average time to hire"},
    {id:2, value:"95%", label:"Employer satisfaction rate"},
    {id:3, value:"500+", label:"Companies hiring remotely"},
]


export default function JobPostpage(){
    return(
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        
            <JobPostForm/>
        
        <div className="col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-medium">Trusted by Industry Leaders</CardTitle>
                    <CardDescription>
                        Join thousands of companies hiring top talent
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                        {company.map((companies) =>(
                            <div key={companies.id}>
                            <Image
                            src={companies.logo}
                            width={80}
                            height={80}
                            alt={ companies.name} className="rounded-lg transition-opacity hover:opacity-65"/>
                            </div>
                        ))}
                        </div>
                        <div className="space-y-4">
                            {testimonial.map((testimonal, index) =>(
                                <blockquote key={index} className="border-l-2 border-primary pl-4">
                                    <p className="text-sm text-muted-foreground italic">"{testimonal.quote}"</p>
                                    <footer className="text-sm mt-2 font-medium">
                                        - {testimonal.author}, {testimonal.company}
                                    </footer>
                                </blockquote>
                                
                            ))}
                        </div>
                           
                        <div className="grid grid-cols-2 gap-4">
                         {stats.map((stat) =>(
                               <div key={stat.id} className="rounded-lg bg-muted p-4">
                                <h4 className="text-2xl font-bold">{stat.value}</h4>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                               </div> 
                            ))}
                        </div>
                    </CardContent>
                
            </Card>
        </div>
        </div>
        </>
    )
}