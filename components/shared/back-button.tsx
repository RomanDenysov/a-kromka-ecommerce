'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type BackButtonProps = {
  href?: string;
  label?: string;
} & ButtonProps;

export function BackButton({ href, label, ...props }: BackButtonProps) {
  const { push, back } = useRouter();

  const handleClick = useCallback(() => {
    if (href) {
      push(href);
    } else {
      back();
    }
  }, [href, push, back]);

  return (
    <Button
      variant="outline"
      size={label ? 'sm' : 'icon'}
      className="size-8 md:size-9"
      onClick={handleClick}
      {...props}
    >
      <ChevronLeftIcon />
      {label}
    </Button>
  );
}
