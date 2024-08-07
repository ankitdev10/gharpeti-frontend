"use client";

import { navItems } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./toggle";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/lib/providers/auth";
import { Profile } from "./profile/profile";

export const Navbar = () => {
  const pathname = usePathname();

  const { data } = useQuery({
    refetchInterval: 5000,
    queryKey: ["me"],
    queryFn: () => me(),
  });

  return (
    <header className="hidden min-h-[65px] md:grid border-b">
      <nav className="flex max-w-[1440px] w-full pr-24 gap-x-28 mx-auto items-center py-3">
        <h1 className="text-2xl text-primary font-medium">
          <Link href="/">Gharbheti</Link>
        </h1>
        <ul className="flex items-center space-x-8">
          {navItems.map((item) => (
            <li className="" key={item.name}>
              <Link
                className={cn(
                  "text-sm font-medium px-3 py-2",
                  item.href === pathname && "bg-primary rounded-md text-white",
                )}
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {data && (
          <div className="ml-auto flex space-x-6 items-center">
            {data.status === 401 ? (
              <div className="flex space-x-6 items-center">
                <Link href="/login">
                  <Button size="sm" variant="outline">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button size="sm">Signup</Button>
                </Link>
              </div>
            ) : (
              <Profile user={data.data} />
            )}
            <ModeToggle />
          </div>
        )}
      </nav>
    </header>
  );
};
