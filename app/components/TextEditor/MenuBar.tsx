import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Editor } from "@tiptap/react"
import { Bold, Heading1, Heading2, Heading3, Italic, ListIcon, ListOrderedIcon, Strikethrough } from "lucide-react";
import { cn } from "@/lib/utils";



    interface iAppProps {
        editor: Editor | null
    }

export function MenuBar({editor} : iAppProps){

    if(!editor){
        return null;
    }

    return(
        <div className="border rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
            <TooltipProvider>
                <div className="flex flex-wrap gap-1">
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("bold")} 
                        onPressedChange={() => editor.chain().focus().toggleBold().run()}
                        className={cn(editor.isActive("bold") && "bg-primary/40 text-black")}>
                           <Bold/> 
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                    </Tooltip>

                         <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("italic")} 
                        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                        className={cn(editor.isActive("italic") && "bg-primary/40 text-black")}>
                           <Italic/> 
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                    </Tooltip>


                         <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("strike")} 
                        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                        className={cn(editor.isActive("strike") && "bg-primary/40 text-black")}>
                           <Strikethrough/> 
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Strike</TooltipContent>
                    </Tooltip>

                         <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("heading", {level:1})} 
                        onPressedChange={() => editor.chain().focus().toggleHeading({level:1}).run()}
                        className={cn(editor.isActive("heading", {level:1}) && "bg-primary/40 text-black")}>
                           <Heading1/> 
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Heading 1</TooltipContent>
                    </Tooltip>


                         <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("heading", {level:2})} 
                        onPressedChange={() => editor.chain().focus().toggleHeading({level:2}).run()}
                        className={cn(editor.isActive("heading", {level:2}) && "bg-primary/40 text-black")}>
                           <Heading2/> 
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Heading 2</TooltipContent>
                    </Tooltip>


                         <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("heading", {level:3})} 
                        onPressedChange={() => editor.chain().focus().toggleHeading({level:3}).run()}
                        className={cn(editor.isActive("heading", {level:3}) && "bg-primary/40 text-black")}>
                           <Heading3/> 
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Heading 3</TooltipContent>
                    </Tooltip>


                         <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("bulletList")} 
                        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn(editor.isActive("bulletList") && "bg-primary/40 text-black")}>
                           <ListIcon/> 
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Bullet List</TooltipContent>
                    </Tooltip>

                         <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("orderedList")} 
                        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn(editor.isActive("orderedList") && "bg-primary/40 text-black")}>
                           <ListOrderedIcon/> 
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Ordered List</TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    )
}