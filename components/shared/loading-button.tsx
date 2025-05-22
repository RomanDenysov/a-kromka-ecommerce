import { Loader2 } from 'lucide-react';
import { Button, type ButtonProps } from '../ui/button';

export function LoadingButton({
  children,
  isLoading = false,
  ...props
}: ButtonProps & { isLoading?: boolean }) {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {isLoading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </Button>
  );
}
