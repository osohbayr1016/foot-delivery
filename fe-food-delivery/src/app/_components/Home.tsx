"use client";

import { Button } from "@/components/ui/button";
import { DialogComp } from "./Dialog";

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
};

export const HomeComponent = ({ foods }: PropsType) => {
  const keys = Object.keys(foods);
  return (
    <div className=" pb-[80px]">
      {keys.map((el) => {
        return (
          <div key={el}>
            <h2 className="text-white text-[30px] font-[600] pb-[54px] pt-[40px]">
              {el}
            </h2>
            <div className="grid grid-cols-3 gap-9">
              {foods[el].slice(0, 6).map((food, index) => {
                return (
                  <div key={index} className="w-full  ">
                    <div className="p-[16px] bg-white rounded-[20px]">
                      <div key={food._id} className="flex flex-col gap-2">
                        <div className="flex relative">
                          <img
                            src={food.image}
                            alt="image"
                            className="rounded-xl"
                          />
                          <DialogComp foodName={food.foodName} image={food.image} ingredients={food.ingredients} price={food.price} _id={food._id} />
                        </div>

                        <div className="flex justify-between items-center">
                          <p className="text-[#ef4444] font-[600] text-[24px]">
                            {food.foodName}
                          </p>
                          <p className="text-[#09090B] font-[600] text-[18px]">
                            ₮{food.price}
                          </p>
                        </div>

                        <div className="font-[400] text-[#09090B] text-[14px]">
                          {food.ingredients}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
