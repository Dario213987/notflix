import {MediaItem} from './MediaItem';
import {Season} from './Season';

export interface Serie extends MediaItem{
  seasons: Season[]
}
