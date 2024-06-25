"use client";

import { User, logout } from "@/lib/providers/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown";

import { getDropDownItems } from "@/lib/utils/dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const Profile = ({ user }: { user: User }) => {
  const dropdownItems = getDropDownItems(user);
  const router = useRouter();

  console.log({ dropdownItems });

  const { data, mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="PP" />
          <AvatarFallback className="text-muted-foreground">
            {user.fullName[0]}
            {user.fullName.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownItems?.map((d) => {
          const Icon = d.icon;
          return (
            <>
              <Link href={d.link}>
                <DropdownMenuItem key={d.name}>
                  <Icon className="mr-2 size-4" />
                  <span>{d.name}</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          );
        })}
        <DropdownMenuItem onClick={() => mutate()}>
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
