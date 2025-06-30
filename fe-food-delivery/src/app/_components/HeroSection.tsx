import Image from "next/image";
import { Header } from "./Header";

export const HeroSection = () => {
  return (
    <div>
      <div>
        <Image
          src={"/BG.png"}
          alt="image"
          height={742}
          width={1540}
          sizes="100vw"
        />
      </div>
    </div>
  );
};
