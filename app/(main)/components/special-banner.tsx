'use client';

import { Icons } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { ChevronRightIcon, Megaphone, Sparkles, XIcon } from 'lucide-react';
import { useState } from 'react';

const bannerVariants = cva('relative w-full', {
  variants: {
    variant: {
      announcement: 'bg-primary text-primary-foreground',
      update: 'bg-blue-600 text-white',
      promotion: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    },
  },
  defaultVariants: {
    variant: 'announcement',
  },
});

const iconVariants = cva('size-5 flex-shrink-0', {
  variants: {
    variant: {
      announcement: 'text-primary-foreground/90',
      update: 'text-blue-100',
      promotion: 'text-white/90',
    },
  },
  defaultVariants: {
    variant: 'announcement',
  },
});

// Mock data - will be replaced with database queries later
const mockBannerData = {
  id: 'banner-2024-1',
  isActive: true,
  isVisible: true,
  variant: 'update' as const,
  title: '🚀 Version 2.0 is Here!',
  description:
    'Experience our redesigned interface with improved performance and new features.',
  actionText: 'View Updates',
  actionUrl: 'https://example.com/updates',
  isDismissible: true,
  priority: 1,
  showUntil: null as Date | null, // or new Date('2024-12-31') for expiring banners
  targetAudience: 'all' as const,
};

type BannerProps = {
  className?: string;
} & VariantProps<typeof bannerVariants>;

export function SpecialBanner({ className, ...props }: BannerProps) {
  const [isShown, setIsShown] = useState(true);

  // TODO: Replace with database query
  const bannerData = mockBannerData;

  // Don't show if banner is not active or not visible
  if (!bannerData.isActive || !bannerData.isVisible || !isShown) {
    return null;
  }

  // Check if banner has expired
  if (bannerData.showUntil && new Date() > bannerData.showUntil) {
    return null;
  }

  const variantConfig = {
    announcement: {
      icon: Megaphone,
    },
    update: {
      icon: Sparkles,
    },
    promotion: {
      icon: Icons.substack,
    },
  };

  const config = variantConfig[bannerData.variant];
  const IconComponent = config.icon;

  function handleDismiss() {
    setIsShown(false);
    // TODO: Save dismissed state to localStorage or send to analytics
    // localStorage.setItem(`banner-dismissed-${bannerData.id}`, 'true');
  }

  function handleAction() {
    if (bannerData.actionUrl && bannerData.actionUrl !== '#') {
      // TODO: Add analytics tracking here
      window.open(bannerData.actionUrl, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <div
      className={cn(bannerVariants({ variant: bannerData.variant }), className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex min-h-12 items-center justify-between gap-4 py-2">
          {/* Content Section */}
          <div className="flex flex-1 items-center gap-3">
            <IconComponent
              className={cn(iconVariants({ variant: bannerData.variant }))}
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <p className="font-medium text-sm">{bannerData.title}</p>
              <p className="text-xs opacity-90 sm:text-sm">
                {bannerData.description}
              </p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2">
            {bannerData.actionText && bannerData.actionUrl && (
              <Button
                onClick={handleAction}
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
              >
                {bannerData.actionText}
                <ChevronRightIcon className="size-4" />
              </Button>
            )}

            {bannerData.isDismissible && (
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="size-8"
                aria-label="Dismiss banner"
              >
                <XIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
