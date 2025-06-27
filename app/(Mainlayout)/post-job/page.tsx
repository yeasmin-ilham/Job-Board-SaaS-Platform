import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo0 from "@/public/pngegg (1).png"
import Logo1 from "@/public/pngegg (11).png"
import Logo2 from "@/public/pngegg (3).png"
import Logo3 from "@/public/pngegg (4).png"
import Logo4 from "@/public/pngegg (10).png"
import Logo5 from "@/public/pngegg (8).png"
import Image from "next/image";


const company = [
    {id:0, name:"NovaNest", logo:Logo0},
    {id:1, name:"CodeHaven", logo:Logo1},
    {id:2, name:"PixelBloom", logo:Logo2},
    {id:3, name:"StackHive", logo:Logo3},
    {id:4, name:"CorePulse", logo:Logo4},
    {id:5, name:"NextSphere", logo:Logo5}
]

export default function JobPostpage(){
    return(
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        <Card className=" col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Hey this is</CardTitle>
            </CardHeader>
        </Card>
        <div className="col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-medium">Trusted by Industry Leaders</CardTitle>
                    <CardDescription>
                        Join thousands of companies hiring top talent
                    </CardDescription>
                    <CardContent>
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
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
        </div>
        </>
    )
}