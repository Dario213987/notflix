import {Episode} from './Episode';

export interface Season {
  name: string,
  indexNumber: number,
  episodes: Episode[],
}
