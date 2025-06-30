"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

export const DialogComp = ({
  foodName,
  price,
  ingredients,
  image,
  _id,
}: FoodProps) => {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);

  const addCount = () => setCount((prev) => prev + 1);

  const minCount = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    const foodData = {
      id: _id,
      foodName,
      price,
      ingredients,
      image,
      count,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = existingCart.findIndex(
      (item: any) => item.id === foodData.id
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].count += count;
    } else {
      existingCart.push(foodData);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    console.log("Saved to localStorage:", existingCart);

    setCount(1);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="relative">
        <Button
          className="absolute right-1 bottom-1 rounded-full size-12"
          onClick={() => setOpen(true)}
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex">
            <img src={image} alt="" className="h-full w-[300px] rounded-xl" />
            <div className="flex flex-col px-[20px] w-[500px] justify-between">
              <div>{foodName}</div>
              <DialogDescription>{ingredients}</DialogDescription>
              <div className="flex gap-2 flex-col mt-3">
                <div className="flex flex-row justify-between items-center gap-3">
                  <div>
                    <p className="font-[400] text-[14px] text-[#09090B]">
                      Total price:
                    </p>
                    <p className="font-[600] text-[24px] text-[#09090B]">
                      ₮{(price * count).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 rounded-full"
                      onClick={minCount}
                    >
                      -
                    </Button>
                    <p>{count}</p>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 rounded-full"
                      onClick={addCount}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button className="w-full" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
