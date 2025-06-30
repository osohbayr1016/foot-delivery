import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const AdminNavigation = () => {
  return (
    <div className="w-[205px] h-[screen] flex items-center flex-col gap-[40px] mt-[40px]">
      <div className="">
        <Image
          src={"/deliver.png"}
          width={46}
          height={37.29037857055664}
          alt="image"
        />
        <p className="text-black text-[20px] font-[600]">
          Nom<span className="">Nom</span>
        </p>
        <p className="text-black text-[12px] font-[400]">Swift delivery</p>
      </div>
      <Link href="/admin/menu">
        <Button>
          <Grid color="#000000" />
          <p>Food menu</p>
        </Button>
      </Link>
      <Link href="/admin/orders">
        <Button>
          <p>Orders</p>
        </Button>
      </Link>
    </div>
  );
};
