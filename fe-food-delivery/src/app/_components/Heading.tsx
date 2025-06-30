"use client";

import { usePathname } from "next/navigation";

export const Header = () => {
  const arr = ["/logIn", "/signUp"];
  const path = usePathname();

  if (arr.includes(path)) {
    return null;
  }

  return <div className="text-red-500 ">Header</div>;
};
