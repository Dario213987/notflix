import {Movie} from './Movie';
import {Serie} from './Serie';

export interface Favorito {
  id: number,
  mediaId: number,
  rating: number,
  mediaType: "película" | "serie",
  review: string,
  mediaItem?: Serie | Movie,
}
