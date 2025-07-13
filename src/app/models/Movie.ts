import {MediaItem} from './MediaItem';

export interface Movie extends MediaItem {
  runtimeTicks: number;
}
