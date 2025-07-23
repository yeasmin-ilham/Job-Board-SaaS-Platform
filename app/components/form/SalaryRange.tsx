/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { FormatCurrency } from "./FormatCurrency";

interface iAppProps {
    control: Control<any>;
    minSalary:number;
    maxSalary:number;
    step:number;
   
}

export function SalaryRange({control,minSalary,maxSalary,step}: iAppProps){

    const {field:formField} = useController({
        name:"salaryFrom",
        control,
    })

    const {field:toField} = useController({
        name:"salaryTo",
        control,
    });
    
    const [range, setRange] = useState<[number,number]>([
        formField.value || minSalary,
        toField.value || maxSalary / 2
    ])

    function handeChangeRange(value:number[]){
        const newRange:[number,number] = [value[0], value[1]]
        setRange (newRange);
        formField.onChange(newRange[0]);
        toField.onChange(newRange[1])
    }

    return(
        <div className="w-full space-y-4">
           <Slider onValueChange={handeChangeRange} min={minSalary} max={maxSalary} step={step} value={range}
           />
           <div className="flex justify-between">
            <span>{FormatCurrency(range[0])}</span>
            <span>{FormatCurrency(range[1])}</span>
           </div>
        </div>
    )
}