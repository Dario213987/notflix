import {MediaItem} from './MediaItem';

export interface Episode extends MediaItem {
  episodeNumber: number,
  runtimeTicks: number,
}
