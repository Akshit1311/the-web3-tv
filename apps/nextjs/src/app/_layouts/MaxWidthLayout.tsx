import React from "react";

interface Props {
  children: React.ReactNode;
}

const MaxWidthLayout = ({ children }: Props) => {
  return (
    <main className="mx-auto h-screen w-full max-w-[1400px] px-4 pb-4">
      {children}
    </main>
  );
};

export default MaxWidthLayout;
