import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  src: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, src, onClick } = props;

  return (
    <div className="relative w-[104px] h-[76px] first:ml-12">
      <Image
        onClick={onClick}
        fill
        src={src}
        alt=""
        objectFit="cover"
        quality={60}
        className={cn("rounded-lg")}
      />
    </div>
  );
};
