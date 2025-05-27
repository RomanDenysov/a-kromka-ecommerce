import { getMedia, getMediaById } from '@/app/actions/media/queries';
import { useQuery } from '@tanstack/react-query';

export function useMediaFetch(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['media', page, limit],
    queryFn: () => getMedia(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMediaByIds(ids: string[]) {
  return useQuery({
    queryKey: ['media', 'by-ids', ids],
    queryFn: async () => {
      if (ids.length === 0) {
        return [];
      }

      const items = await Promise.all(ids.map((id) => getMediaById(id)));
      const validItems = items.filter((item) => item !== undefined);

      // Maintain order based on ids array
      return ids
        .map((id) => validItems.find((item) => item?.id === id))
        .filter((item) => item !== undefined);
    },
    enabled: ids.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
