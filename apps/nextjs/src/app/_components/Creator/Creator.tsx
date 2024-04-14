import React from "react";
import Image from "next/image";

import Navbar from "../Navbar";

interface CreatprProps {}

const Creator: React.FC<CreatprProps> = () => {
  return (
    <section className="relative mt-4 flex w-full items-center justify-between">
      <div>
        <Image
          src="/logo.png"
          alt="Logo"
          height={50}
          width={107.2}
          className="rounded-lg"
        />
      </div>
    </section>
  );
};
export default Creator;
