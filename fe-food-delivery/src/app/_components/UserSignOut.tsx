"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

export const UserSignOut = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setEmail(user?.email || "Example@gmail.com");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    localStorage.removeItem("cart"); 
    setOpen(false);
    window.location.reload(); // or redirect: window.location.href = "/login";
  };

  return (
    <div className="relative inline-block text-left">
      <Button
        className="rounded-full bg-[#EF4444] w-[36px] h-[36px] flex items-center justify-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <User />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-[220px] bg-white rounded-xl shadow-lg border z-50">
          <div className="px-4 py-3 text-sm text-gray-700">{email}</div>
          <div className="border-t" />
          <Button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};
