import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-50 relative mt-4 flex w-full justify-center  sm:justify-start">
      <Image
        src="/logo.png"
        alt="Logo"
        height={50}
        width={107.2}
        className="rounded-lg"
      />
      {/* <Image src="/logo.png" alt="Logo" height={933} width={2000} /> */}
    </div>
  );
};

export default Navbar;
