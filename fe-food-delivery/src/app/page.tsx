
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
  const { data } = await axios.get("http://localhost:8000/foods");
  // const { user } = useAuth();
  // const [file, setFile] = useState();
  // const [url, setUrl] = useState("");

  // const uploadImage = async () => {
  //   if (!file) {
  //     return null;
  //   }
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "FoodDelivery");

  //   try {
  //     const response = await fetch(
  //       "https://api.cloudinary.com/v1_1/djvjsyzgw/image/upload",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     const result = await response.json();

  //     alert("success");

  //     return result.secure_url;
  //   } catch (error: unknown) {
  //     return { error: "Failed to upload image" };
  //   }
  // };
  // const fileHandler = (event: any) => {
  //   setFile(event.target.files[0]);
  //   const url = URL.createObjectURL(event.target.files[0]);

  //   setUrl(url);
  // };

  return (
    <div className="bg-[#404040]">
      <Header />
      <HeroSection />
      <div className="px-[88px]">
        <HomeComponent foods={data.foods} />
      </div>
      {/* <input type="file" onChange={fileHandler} />
      <Button onClick={uploadImage}>Submit </Button>
      <Image src={url} alt="123" width={100} height={100} /> */}
      <Footer />
    </div>
  );
} 
