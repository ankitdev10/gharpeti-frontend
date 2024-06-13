import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { Button } from './button';

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
  <Button
    className={cn(className)}
    {...props}
  >
    {loading ? (
      <>
        <Loader className='mr-2 h-4 w-4 animate-spin' />
        {loadingText}
      </>
    ) : (
      defaultText
    )}
  </Button>
);
