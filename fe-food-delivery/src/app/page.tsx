import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Footer } from "./_components/Footer";
import { useAuth } from "./_components/UserProvider";
import Image from "next/image";
import { HeroSection } from "./_components/HeroSection";
import { HomeComponent } from "./_components/Home";
import axios from "axios";
import { Header } from "./_components/Header";

export default async function Home() {
  const { data } = await axios.get("https://foot-delivery-p31l.onrender.com/foods");

  return (
    <div className="bg-[#404040]">
      <Header />
      <HeroSection />
      <div className="px-[88px]">
        <HomeComponent foods={data.foods} />
      </div>
      <Footer />
    </div>
  );
}
