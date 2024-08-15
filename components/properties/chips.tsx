"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import { XIcon } from "lucide-react";

export const Chips = () => {
  const router = useRouter();
  const searchparams = useSearchParams();

  const filterParams = Object.fromEntries(searchparams.entries());

  const handleChipRemove = (key: string) => {
    delete filterParams[key];
    const newSearchParams = new URLSearchParams(filterParams).toString();
    router.push(`?${newSearchParams}`);
  };

  return (
    <div>
      {Object.keys(filterParams).map((key) => (
        <Badge
          key={key}
          className="px-4 py-2 w-32 flex space-x-2"
          variant="outline"
        >
          <span>
            {key}: {filterParams[key]}
          </span>
          <span>|</span>
          <XIcon size={16} onClick={() => handleChipRemove(key)} />
        </Badge>
      ))}
    </div>
  );
};
