"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CircleAlert size={64} color="red" />

      <h1 className="mt-4 text-red-500 font-medium text-2xl">
        We can not find the property you are trying to edit.
      </h1>
      <p className="mt-4 text-muted-foreground text-sm">
        If you think this is a mistake, please contact us.
      </p>

      <Link href="/profile/gharbheti/properties">
        <Button variant="outline" className="mt-8">
          View Properties
        </Button>
      </Link>
    </div>
  );
}
