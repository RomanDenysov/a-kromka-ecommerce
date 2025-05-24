import {
  ImageIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UsersIcon,
} from 'lucide-react';

export const adminNav = {
  main: [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboardIcon,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: UsersIcon,
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: ShoppingBagIcon,
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCartIcon,
    },
  ],
  secondary: [
    {
      label: 'Media',
      href: '/admin/media',
      icon: ImageIcon,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: SettingsIcon,
    },
  ],
};
