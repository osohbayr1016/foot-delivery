import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="w-full h-[755px] bg-[#18181B] flex justify-around flex-col">
      <div className="h-[92px] bg-[#EF4444]  ">
        <p className="text-[#FAFAFA] text-[30px] font-[600] flex items-center h-full justify-center">
          Fresh Fast deliver
        </p>
      </div>
      <div className="flex flex-col justify-around h-[500px]">
        <div className="text-[#FAFAFA] font-[400] text-[16px] flex justify-between w-full px-[88px] cursor-pointer">
          <div>
            <Image
              src={"/deliver.png"}
              width={46}
              height={37.29037857055664}
              alt="image"
            />
            <p className="text-white text-[20px] font-[600]">
              Nom<span className="text-[#EF4444]">Nom</span>
            </p>
            <p className="text-white text-[12px] font-[400]">Swift delivery</p>
          </div>
          <div className="flex gap-[16px] flex-col">
            <a href="/">NOMNOM</a>
            <p>Home</p>
            <p>Contact us</p>
            <p>Delivery Zone</p>
          </div>
          <div className="flex gap-[16px] flex-col">
            <p>MENU</p>
            <p>Appetizers</p>
            <p>Salads</p>
            <p>Pizzas</p>
            <p>Main dishes</p>
            <p>Desserts</p>
          </div>
          <div className="flex gap-[16px] flex-col">
            <p className="text-[#18181B]">.</p>
            <p>Side dish </p>
            <p>Brunch</p>
            <p>Desserts</p>
            <p>Beverages</p>
            <p>Fish & Sea foods</p>
          </div>
          <div className="pr-[168px] flex gap-[16px] flex-col">
            <p>FOLLOW US</p>
            <div className="flex gap-[16px]">
              <Facebook />
              <Instagram />
            </div>
          </div>
        </div>
        <div className="text-[#71717A] flex gap-[48px] pt-[32px] border-t mx-[88px] cursor-pointer">
          <p>Copy right 2024 © Nomnom LLC</p>
          <p>Privacy policy </p>
          <p>Terms and conditoin</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
};
