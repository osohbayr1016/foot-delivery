import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export const CreateCategory = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#ef4444] w-[36px] h-[36px] rounded-full">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="py-[24px] flex flex-col gap-3">
              <Label>Category name</Label>
              <Input type="text" placeholder="Type category name" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add category</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
