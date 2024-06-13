import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Button } from "./button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  defaultText: string;
  loadingText: string;
}

export const LoadingButton = ({
  loading,
  defaultText,
  loadingText,
  className,
  ...props
}: LoadingButtonProps) => (
  <Button className={cn(className)} {...props}>
    {loading ? (
      <>
        <Loader className="mr-2 h-4 w-4 animate-spin" />
        {loadingText}
      </>
    ) : (
      defaultText
    )}
  </Button>
);
