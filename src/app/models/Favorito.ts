import {Movie} from './Movie';
import {Serie} from './Serie';

export interface Favorito {
  id: number,
  mediaId: string,
  rating: number,
  mediaType: "pelicula" | "serie",
  review: string,
  mediaItem?: Serie | Movie,
}
