"use client";

import { me } from "@/lib/providers/auth";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const Denied = ({
  children,
  handleEvent,
}: {
  children: React.ReactNode;
  handleEvent?: () => void;
}) => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  const pathname = usePathname();

  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    console.log("here");
    const authorized = data?.status === 200;
    if (!authorized) {
      e.preventDefault();
      router.push(`/login?redirect=${pathname}`, {
        scroll: false,
      });
      toast("Please log in first to continue with this action.");
    }

    if (typeof handleEvent !== "undefined") {
      handleEvent();
    }
  };
  return (
    <div className="w-fit" onClick={handleClick}>
      {children}
    </div>
  );
};
