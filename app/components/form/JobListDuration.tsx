import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { ControllerRenderProps } from "react-hook-form"



interface JobDay {
   
    day:number,
    about:string,
    price:number
}

  const JobDurationArray : JobDay[] = [
    { day:30, about:"Standard Listing", price:99},

    {day:60,about:"Extended visibility" , price:179},
    
    { day:90,about:"Maximum exposure" , price:249},

]

interface iAppProps{
     field: ControllerRenderProps
}

export function JobDateDuration({field} : iAppProps){
    return(
        <RadioGroup
        defaultValue={field.value?.toString()}
        onValueChange={(value) => field.onChange(parseInt(value))}>
        <div className="flex flex-col gap-4">
          {JobDurationArray.map((duration) => (
            <div key={duration.day} className="relative">
            <RadioGroupItem value={duration.day.toString()} id={duration.day.toString()}
            className="sr-only"/>
            <Label className="flex flex-col cursor-pointer" htmlFor={duration.day.toString()}>
                <Card className={cn(field.value === duration.day? 
                    "border-primary bg-primary/10"
                    :"hover:bg-secondary/50", "p-4 border-2 transition-all"
                )}>
                    <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-lg">{duration.day} Days</p>
                        <p className="text-sm text-muted-foreground">{duration.about}</p>
                    </div>

                    <div>
                        <p className="font-bold text-xl">${duration.price}</p>
                        <p className="text-sm text-muted-foreground">${Math.floor(duration.price / duration.day)}/days</p>
                    </div>

                    </div>
                </Card>
            </Label>
            </div>
          ))}
        </div>
        </RadioGroup>
    )
}