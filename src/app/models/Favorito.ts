import {MediaItem} from './MediaItem';

export interface Favorito {
  id: number,
  mediaId: number,
  rating: number,
  mediaType: "película" | "serie",
  review: string,
  mediaItem?: MediaItem,
}
