import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { getMediaById } from '@/app/actions/media';
import { BackButton } from '@/components/shared/back-button';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { format } from 'date-fns';
import { ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageLayout } from '../../products/components/page-layout';
import { MediaDeleteButton } from './components/media-delete-button';
import { MediaEditForm } from './components/media-edit-form';

export default async function SingleMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const decodedId = decodeURIComponent((await params).id);
  const media = await getMediaById(decodedId);

  if (!media) {
    notFound();
  }

  const size = Number.parseInt(media.size);
  let sizeString = '';
  switch (true) {
    case size < 1024:
      sizeString = `${size} B`;
      break;
    case size < 1024 * 1024:
      sizeString = `${(size / 1024).toFixed(1)} KB`;
      break;
    default:
      sizeString = `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  const formatedData = {
    uploaded: format(media.createdAt, 'MMM d, yyyy h:mm a'),
    lastModified: format(media.updatedAt, 'MMM d, yyyy h:mm a'),
  };

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Media', href: '/admin/media' },
          { label: media.originalName, href: `/admin/media/${media.id}` },
        ]}
      />
      <PageLayout>
        {/* Header */}
        <PageLayout.Heading>
          <BackButton />
          <div className="flex items-center gap-2">
            <Link
              href={media.url}
              target="_blank"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <ExternalLinkIcon className="size-4" />
              View Original
            </Link>
            <MediaDeleteButton mediaId={media.id} filename={media.filename} />
          </div>
        </PageLayout.Heading>

        <PageLayout.Content>
          {/* Main Content */}
          <div className="grid size-full gap-6 lg:grid-cols-2">
            {/* Image Preview */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={media.url}
                  alt={media.alt || media.originalName}
                  width={800}
                  height={800}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>

              {/* Image Info */}
            </div>

            {/* Edit Form */}
            <div className="flex size-full flex-col items-stretch justify-between gap-4">
              <div>
                <h3 className="font-medium text-2xl">{media.originalName}</h3>
                <p className="text-muted-foreground text-sm">ID: {media.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-lg border bg-card p-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">
                    File Size
                  </span>
                  <p>{sizeString}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Type
                  </span>
                  <Badge variant="secondary" className="mt-1">
                    {media.mimeType}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Uploaded
                  </span>
                  <p>{formatedData.uploaded}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Last Modified
                  </span>
                  <p>{formatedData.lastModified}</p>
                </div>
              </div>

              <MediaEditForm media={media} className="flex-1" />
            </div>
          </div>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}
