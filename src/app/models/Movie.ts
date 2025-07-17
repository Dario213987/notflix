import {MediaItem} from './MediaItem';

export interface Movie extends MediaItem {
  runTimeTicks: number;
}
