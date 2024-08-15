"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CircleAlert size={64} color="red" />

      <h1 className="mt-4 text-red-500 font-medium text-2xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-muted-foreground text-sm">
        We are working on fixing this issue. Please try again later.
      </p>

      <Link href="/" target="_self">
        <Button variant="outline" className="mt-8">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
