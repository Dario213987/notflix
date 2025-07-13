import {MediaItem} from './MediaItem';
import {Episode} from './Episode';

export interface Season extends MediaItem{
  episodes: Episode[];
}
