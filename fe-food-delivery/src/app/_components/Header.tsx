"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, LogOut, MapPin, User } from "lucide-react";
import Image from "next/image";
import { CartSheet } from "./CartSheet";
import { LocationComp } from "./Location";
import { useState } from "react";
import { UserSignOut } from "./UserSignOut";
import { usePathname } from "next/navigation";

export const Header = () => {
  const arr = ['/logIn', '/signUp', '/admin/orders', '/admin/menu',]
  const path = usePathname()

  if(arr.includes(path)){
    return null
  }
  return (
    <div className="flex justify-around bg-[#18181B] h-[172px] items-center">
      <div className="bg-[#18181B] flex gap-3 cursor-pointer">
        <div>
          <Image
            src={"/deliver.png"}
            width={46}
            height={37.29037857055664}
            alt="image"
          />
        </div>
        <div className="">
          <p className="text-white text-[20px] font-[600]">
            Nom<span className="text-[#EF4444]">Nom</span>
          </p>
          <p className="text-white text-[12px] font-[400]">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-[13px]">
        <div className="text-[12px] font-[400] bg-white w-[280px] flex rounded-full px-3 items-center justify-center gap-1">
          <MapPin className="text-[#EF4444]" />
          <p className="text-[#EF4444]">Delivery address:</p>
          <div className=" cursor-pointer flex items-center">
            <button className="text-[#71717A]">
              <LocationComp />
            </button>
            <ChevronRight className="text-[#71717A]" />
          </div>
        </div>
        <div>
          <CartSheet />
        </div>
        <div>
          <UserSignOut />
        </div>

        {/* <div className="bg-white h-[104px] w-[188px] rounded-xl padding-4 gap-2 flex flex-col items-center justify-center absolute right-[105px] top-[60px]">
          <p className="font-[600] text-[20px] text-[#09090B]">
            Test@gmail.com
          </p>
          <Button className="bg-[#f4f4f5] text-black rounded-full">
            Sign Out
          </Button>
        </div> */}
      </div>
    </div>
  );
};
