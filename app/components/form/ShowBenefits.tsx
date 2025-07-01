
import { Badge } from "@/components/ui/badge";
import { benefits } from "./BenefitsArray";
import { ControllerRenderProps } from "react-hook-form";

interface iappProps {
    field: ControllerRenderProps
}



export function ShowBenefits({field} : iappProps){

    function toggleBenefits(benefitsId:string){
    const currentBenefits = field.value || []

    const newBenefits = currentBenefits.includes(benefitsId) ? currentBenefits.filter((id:string) => id !== benefitsId) : [...currentBenefits,benefitsId]
    field.onChange(newBenefits);

}
    return(
        <div>
            <div className="flex flex-wrap gap-3">

                {benefits.map((benefit) => {
                    const isSelected = (field.value || []).includes(benefit.id);
                    return(
                          <Badge key={benefit.id} className=" cursor-pointer transition-all hover:scale-105 
                          active:scale-95 text-sm px-4 py-1.5 rounded-full" 
                          variant={isSelected?"default" : "outline"}
                onClick={()=>toggleBenefits(benefit.id)}>
                    <span className="flex items-center gap-2 ">
                        {benefit.icon}
                        {benefit.label}
                    </span>
                </Badge> 
                
                    )
                })}
            </div>
            <div className="mt-4 ">
                    Select Benefits :<span className="text-primary font-medium text-[18px]"> {field.value.length || []}</span>
                </div>
        </div>
    )
}