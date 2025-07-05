export interface MediaItem {
  id: number;
  name: string;
  originalTitle: string | null;
  imageId: string;
  premiereDate: string | null;
  overview: string | null;
  communityRating: number | null;
  runTimeTicks: number | null;
  productionYear: number | null;
}
