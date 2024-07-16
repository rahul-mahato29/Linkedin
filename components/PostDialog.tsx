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

export function PostDialog({
  setOpen,
  open,
  src,
}: {
  setOpen: any;
  open: any;
  src: string;
}) {
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        // className="sm:max-w-[425px]"
      >
        <DialogTitle className="flex items-center gap-3">
            <ProfileImage url={src} />
            <div>
              <h1 className="font-semibold">Rahul Mahato</h1>
              <p className="text-sm font-normal">Post to Anyone </p>
            </div>
        </DialogTitle>
        <form className="border-b border-gray-400 pb-2">
            <Textarea id="name" name="inputText" className="border-none h-44 resize-none" placeholder="What do you want to talk about ?" />
        </form>
        <DialogFooter className="">
          <Button type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
