import {MediaItem} from './MediaItem';

export interface Favorito {
  id: number,
  mediaId: string,
  mediaType: 'pelicula' | 'serie',
  rating: number,
  review: string,
  mediaItem?: MediaItem
}
