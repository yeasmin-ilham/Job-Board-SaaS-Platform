import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { FormatCurrency } from "./FormatCurrency";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface iappProp{
    postData: {
    id: string;
    createdAt: Date;
    company: {
        name: string;
        location: string;
        about: string;
        logo: string;
    };
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
}
}

function formateTime(date:Date){
    const now = new Date();
    const diffDays = Math.floor(
        (now.getTime() - new Date(date).getTime())/(1000*60*60*24)
    )
    if(diffDays === 0){
        return "Posted Today";
    }else if (diffDays ===1) {
        return "Posted 1 Day ago "
    }else{
       return `Posted ${diffDays} days ago`
    }
}

export function CompanyCard({postData} : iappProp){
    return(
        <Link href={`/job`}>
           <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
      <CardHeader>
    <div className="flex flex-col md:flex-row gap-4">
      <Image
        src={postData.company.logo}
        width={48}
        height={48}
        alt="image" className="size-12 rounded-lg" />
        <div>
            <h1 className="text-xl md:text-2xl font-bold">{postData.jobTitle}</h1>
            <div className="flex flex-wrap gap-2 items-center">
                <p className="text-sm text-muted-foreground">
                    {postData.company.name}
                </p>
                <span className="inline text-muted-foreground">*</span>
                <Badge className="rounded-full" variant="secondary">
                    {postData.employmentType}
                </Badge>
                <span className="inline text-muted-foreground">*</span>
                <Badge className="rounded-full">{postData.location}</Badge>
                   <span className="inline text-muted-foreground">*</span>
                   <p className="text-sm text-muted-foreground">
                    {FormatCurrency(postData.salaryFrom)} -{""}{FormatCurrency(postData.salaryTo)}
                   </p>
            </div>
        </div>
        <div className="md:ml-auto">
            <div className="flex items-center gap-2">
                <MapPin className="size-4"/>
                <h1>{postData.location}</h1>
            </div>
            <p className="text-sm text-muted-foreground md:text-right">{formateTime(postData.createdAt)}</p>
        </div>
    </div>
    <p className="text-base  line-clamp-2 !mt-5">{postData.company.about}</p>
      </CardHeader>
       </Card>
       </Link>

    )
}