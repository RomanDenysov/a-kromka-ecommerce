import { getMedia } from '@/app/actions/media/queries';
import { MediaGallery } from '@/components/shared/media-gallery';
import { DashboardHeader } from '../../components/dashboard-header';
import { PageLayout } from '../products/components/page-layout';
import { MediaUploadWrapper } from './components/media-upload-wrapper';

export default async function MediaPage() {
  const mediaItems = await getMedia(1, 100);

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Media' },
        ]}
      />
      <PageLayout>
        <PageLayout.Heading>
          <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">Media</h1>
        </PageLayout.Heading>
        <PageLayout.Content>
          {/* Upload Form */}
          <MediaUploadWrapper />

          {/* Media Gallery */}
          <div className="mt-10 flex flex-col gap-4">
            <h2 className="font-medium text-xl">
              Media Gallery ({mediaItems.length} images)
            </h2>

            <MediaGallery />
          </div>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}
