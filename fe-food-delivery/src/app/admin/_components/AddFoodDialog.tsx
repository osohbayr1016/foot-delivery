"use client";

import { useAuth } from "@/app/_components/UserProvider";
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
import Image from "next/image";
import { useState } from "react";

export const AddFoodDialog = () => {
  const { user } = useAuth();
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");

  const uploadImage = async () => {
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "FoodDelivery");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djvjsyzgw/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      alert("success");

      return result.secure_url;
    } catch (error: unknown) {
      return { error: "Failed to upload image" };
    }
  };
  const fileHandler = (event: any) => {
    setFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);

    setUrl(url);
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#ef4444] w-[40px] h-[40px] rounded-full">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="pb-[40px]">
              Add new Dish to your Category
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex gap-[24px]">
              <div className="flex flex-col gap-2">
                <Label className="">Food name</Label>
                <Input placeholder="Type food name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Food price</Label>
                <Input placeholder="Enter price" />
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Ingredients</Label>
              <Textarea placeholder="List ingerdients..." />
            </div>
            <div className="grid gap-3">
              <Label>Food image</Label>
              <input type="file" onChange={fileHandler} />
              <Image src={url} alt="" width={150} height={100} />
              <Button onClick={uploadImage}>Submit </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
