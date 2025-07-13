import {Season} from './Season';
import {MediaItem} from './MediaItem';

export interface Serie extends MediaItem{
  seasons: Season[];
}
