import {
  forwardRef,
  useEffect,
  useState,
  type InputHTMLAttributes,
  type SetStateAction,
} from "react";

import { EyeOff, Eye, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  // eslint-disable-next-line react/require-default-props
  reveal?: boolean;
  // eslint-disable-next-line react/require-default-props
  setReveal?: (value: SetStateAction<boolean>) => void;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      reveal: propsReveal = false,
      setReveal: propsSetReveal,
      ...props
    },
    ref,
  ) => {
    const [reveal, setReveal] = useState(propsReveal);

    useEffect(() => {
      setReveal(propsReveal);
    }, [propsReveal]);

    return (
      <div className="relative">
        <Input
          type={reveal ? "text" : "password"}
          className={cn("pr-12", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute right-0 top-1/2 h-full -translate-y-1/2 hover:bg-transparent"
          onClick={() => {
            if (propsSetReveal) {
              propsSetReveal((prev) => !prev);
            } else {
              setReveal(!reveal);
            }
          }}
        >
          {reveal ? <EyeOff /> : <EyeIcon />}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
