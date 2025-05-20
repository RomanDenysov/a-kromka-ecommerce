'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth.client';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UserSignOutButton() {
  const { push } = useRouter();
  const logout = async () =>
    await signOut({
      fetchOptions: {
        onSuccess: () => push('/'),
      },
    });

  return (
    <DropdownMenuItem onClick={logout}>
      <LogOutIcon />
      Log out
    </DropdownMenuItem>
  );
}
