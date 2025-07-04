export interface Pelicula {
  id: number;
  name: string;
  originalTitle: string | null;
  jellyfinId: string;
  premiereDate: string | null;
  overview: string | null;
  communityRating: number | null;
  tunTimeTicks: number | null;
  productionYear: number | null;
}
