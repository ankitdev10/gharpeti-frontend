"use client";

import { BookmarkIcon } from "lucide-react";
import { Denied } from "../denied";
import { Button } from "../ui/button";

export const Bookmark = () => {
  const handleClick = () => {};
  return (
    <Denied onClick={handleClick}>
      <Button variant="outline">
        <BookmarkIcon />
      </Button>
    </Denied>
  );
};
