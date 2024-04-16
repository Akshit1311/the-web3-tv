import React from "react";

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => (
  <div className="flex w-full items-center justify-center rounded-md border">
    <div className="flex h-[17.4rem] w-full flex-col items-center justify-center gap-y-2 bg-black">
      <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      />
      <div className="max-w-48 text-center text-sm font-medium text-white">
        {text}.
      </div>
    </div>
  </div>
);
export default Loader;
