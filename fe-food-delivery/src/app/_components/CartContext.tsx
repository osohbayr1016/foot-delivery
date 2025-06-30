"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  count: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  updateItemCount: (id: string, amount: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(localCart);
  }, []);

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex((i) => i.id === item.id);
    if (existingIndex !== -1) {
      updatedCart[existingIndex].count += item.count;
    } else {
      updatedCart.push(item);
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateItemCount = (id: string, amount: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, count: Math.max(item.count + amount, 1) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, updateItemCount, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
