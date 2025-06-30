import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddFoodDialog } from "../_components/AddFoodDialog";
import { CreateCategory } from "../_components/CreateCategory";

const AdminMenuPage = () => {
  return (
    <div className="pl-[24px] pr-[40px] py-[24px] bg-gray-100 h-full w-full">
      <div className="flex flex-col gap-[24px] items-end">
        <div className="rounded-full bg-white h-[36px] w-[36px] flex justify-center items-center ">
          pfp
        </div>
        <div className="bg-white w-full p-6 rounded-xl">
          <h4 className="py-[16px] text-[#09090B] font-[600] text-[20px]">
            Dishes Category
          </h4>
          <div className="flex items-center gap-2">
            <Badge className="px-[16px] py-[8px]">All Dishes</Badge>
            <CreateCategory />
          </div>
        </div>
        <div className="bg-white w-full p-6 rounded-xl">
          <h4 className="py-[16px] text-[#09090B] font-[600] text-[20px]">
            Category name
          </h4>
          <div className="">
            <div className="h-[250px] w-[270px] border-dashed border-1 flex justify-center items-center rounded-[20px]">
              <div className="flex flex-col items-center">
                <AddFoodDialog />
                <p>Add new Dish</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuPage;
