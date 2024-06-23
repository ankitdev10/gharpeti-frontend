"use client";

import { me } from "@/lib/providers/auth";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const Denied = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  const pathname = usePathname();

  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const authorized = data?.status === 200;
    if (authorized) {
      onClick();
    } else {
      router.push(`/login?redirect=${pathname}`, {
        scroll: false,
      });
      toast("Please log in first to continue with this action.");
    }
  };
  return (
    <div className="w-fit" onClick={handleClick}>
      {children}
    </div>
  );
};
