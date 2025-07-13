"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, Loader2 } from "lucide-react";
import {useFormStatus } from "react-dom"

interface iappProps{
    savedJob : boolean,
}
export function SubmitButton({savedJob}:iappProps){
    const {pending} = useFormStatus();
    return(
      <Button variant="outline" type="submit" disabled= {pending}>
        {pending? (
        <>
        <Loader2 className="size-4 animate-spin"/>
        <span>Saving...</span>
        </>
        ) : (
        <>
        <Heart className={cn(savedJob? "fill-current text-red-500" 
            : " " , "size-4 transition-colors"
        )}/>
        {savedJob? "Saved" : "Save Job"}
        </>
        )}
      </Button>
    )
}