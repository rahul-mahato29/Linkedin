import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ProfileImage from "./shared/ProfileImage";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";

export function PostDialog({ setOpen, open, src }: { setOpen: any; open: any; src: string; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] =  useState<any>("");

  const fileChangeHandler = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedFile(dataUrl);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="sm:max-w-[470px]"
      >
        <DialogTitle className="flex items-center gap-3">
            <ProfileImage url={src} />
            <div>
              <h1 className="font-semibold">Rahul Mahato</h1>
              <p className="text-sm font-normal">Post to Anyone </p>
            </div>
        </DialogTitle>
        <form className="border-b border-gray-400">
            <Textarea id="name" name="inputText" className="border-none h-40 resize-none" placeholder="What do you want to talk about ?" />
            <div className="my-4">
              {
                selectedFile && (
                  <center><Image src={selectedFile} alt="preview-image" className="" width={200} height={200}/></center>
                )
              }
            </div> 
        </form>
        <DialogFooter>
            <input ref={inputRef} onChange={fileChangeHandler} type="file" className="hidden" name="image" accept="image/*" />
        </DialogFooter>
            <div className="flex items-center justify-between">
              <Button onClick={() => inputRef?.current?.click()} variant={'link'} className="p-0 m-0"><Images className="text-blue-500"/></Button>
              <Button type="submit">Post</Button>
            </div>
      </DialogContent>
    </Dialog>
  );
}
