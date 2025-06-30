"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderSuccessDialog } from "./OrderSuccessDialog";
import axios from "axios";

type CartItem = {
  id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  count: number;
};

export const CartSheet = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const addressRef = useRef<HTMLTextAreaElement | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");

  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateItemCount = (id: string, amount: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newCount = item.count + amount;
        return newCount > 0 ? { ...item, count: newCount } : item;
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    // const itemPrice = cart.map((item) => {
    //   const price = item.price * item.count

    // const firstPrice = 0;
    // const calculatedPrice = price.reduce((item.price, item.count) => {

    // })
    // return calculatedPrice

    // })
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr.count * curr.price,
      0
    );
    console.log(totalPrice, "total");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("login hiine uu");
      return;
    }

    const readyFoods = cart.map((el: CartItem) => {
      return { food: el.id, quantity: 1 };
    });

    await axios.post(
      "http://localhost:8000/createOrder",
      {
        totalPrice: totalPrice + 5000,
        address: addressRef.current?.value,
        foodOrderItems: readyFoods,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const location = addressRef.current?.value || "";
    if (!location) return alert("Address hooson bn");
    if (cart.length === 0) return alert("hooloo songono uu");

    const newOrder = {
      items: cart,
      location,
      createdAt: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    const updatedOrders = [...prev, newOrder];
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
    localStorage.removeItem("cart");

    setCart([]);
    if (addressRef.current) addressRef.current.value = "";

    setShowDialog(true);

    setActiveTab("orders");
  };

  useEffect(() => {
    const carts = localStorage.getItem("cart");
    const foods = carts ? JSON.parse(carts) : [];
    setCart(foods);

    const getMyOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("login hiine uu");
        return;
      }

      const { data } = await axios.get("http://localhost:8000/getOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(data.foods);
    };
    getMyOrders();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart
          <span className="text-sm font-semibold">
            ({cart.reduce((total, item) => total + item.count, 0)})
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-[#404040] border-none !w-[500px] !max-w-[500px] overflow-y-auto pb-[50px]">
        <SheetHeader>
          <SheetTitle className="text-[#fafafa] text-[20px] font-[600] flex gap-2">
            <ShoppingCart />
            Order detail
          </SheetTitle>
        </SheetHeader>

        <div className="px-[35px] mt-4">
          <Tabs className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-white rounded-full p-1">
              <TabsTrigger value="cart" className="rounded-full">
                Cart
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-full">
                Orders
              </TabsTrigger>
            </TabsList>

            {/* --- Cart Tab --- */}
            <TabsContent value="cart">
              <div className="mt-4 flex flex-col gap-4 bg-white p-[20px] rounded-xl">
                <p className="font-[600] text-[20px] text-[#71717A]">My Cart</p>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 border-b pb-2"
                  >
                    <img
                      src={item.image}
                      alt="image"
                      className="w-[90px] h-[90px] rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-[#ef4444] text-[16px] font-[700]">
                          {item.foodName}
                        </p>
                        <Button
                          size="icon"
                          className="rounded-full bg-transparent border border-[#ef4444]"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="text-[#ef4444]" />
                        </Button>
                      </div>
                      <p className="text-sm text-[#09090B]">
                        {item.ingredients}
                      </p>
                      <div className="flex justify-between mt-2">
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="size-7 bg-transparent rounded-full"
                            onClick={() => updateItemCount(item.id, -1)}
                          >
                            -
                          </Button>
                          <span className="font-bold">{item.count}</span>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="size-7 bg-transparent rounded-full"
                            onClick={() => updateItemCount(item.id, 1)}
                          >
                            +
                          </Button>
                        </div>
                        <span className="font-bold">
                          ₮{(item.price * item.count).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <p className="font-semibold text-[#71717A]">
                    Deliver Location
                  </p>
                  <Textarea
                    ref={addressRef}
                    placeholder="Please enter address"
                  />
                </div>
              </div>
              <div className=" p-[16px] mt-4 bg-white rounded-[20px]">
                <p className="font-[600] text-[20px] text-[#71717A] mb-2">
                  Payment Info
                </p>
                <div className="flex justify-between text-[16px] text-[#09090B] font-[500] ">
                  <p>Items total:</p>
                  <p>
                    ₮
                    {cart
                      .reduce(
                        (total, item) => total + item.price * item.count,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between text-[16px] text-[#09090B] font-[500] mt-2 pb-2">
                  <p>Shipping:</p>
                  <p>₮{cart.length === 0 ? "0" : "5000"}</p>
                </div>

                <div className="flex justify-between text-[18px] py-[10px] text-[#09090B] font-[700] ">
                  <p>Total:</p>
                  <p>
                    ₮
                    {(
                      cart.reduce(
                        (total, item) => total + item.price * item.count,
                        0
                      ) + (cart.length === 0 ? 0 : 5000)
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="text-right mt-2">
                  <Button
                    onClick={handleCheckout}
                    className="bg-[#ef4444] text-white w-full relative"
                  >
                    Checkout
                    <OrderSuccessDialog
                      open={showDialog}
                      onOpenChange={setShowDialog}
                    />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* --- Orders Tab --- */}
            <TabsContent value="orders">
              <div className="mt-4 flex flex-col gap-4 bg-white p-[20px] rounded-xl">
                <p className="font-[600] text-[20px] text-[#71717A]">
                  Order History
                </p>
                {orders?.length === 0 && (
                  <p className="text-sm text-gray-500">No orders yet.</p>
                )}
                {orders?.map((order, index) => (
                  <div key={index} className="border-b pb-3">
                    <p className="text-xs text-gray-400">
                      {new Date(order?.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      📍 {order?.address}
                    </p>
                    <p>{order?.foodName}</p>
                    <p>{order?.totalPrice}₮</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <OrderSuccessDialog open={showDialog} onOpenChange={setShowDialog} />
      </SheetContent>
    </Sheet>
  );
};
