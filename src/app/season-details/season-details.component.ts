import { Component } from '@angular/core';
import {map, Observable} from 'rxjs';
import {SeriesDataService} from '../series-data.service';
import {ActivatedRoute} from '@angular/router';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Season} from '../models/Season';
import {Episode} from '../models/Episode';

@Component({
  selector: 'app-season-details',
  standalone: false,
  templateUrl: './season-details.component.html',
  styleUrl: './season-details.component.scss'
})
export class SeasonDetailsComponent {
  faHeart = faStar;
  season$: Observable<Season>;

  constructor(
    private route: ActivatedRoute,
    private seriesDataService: SeriesDataService
  ) {
    const serieId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const seasonId = Number(this.route.snapshot.paramMap.get('seasonId'));

    this.season$ = this.seriesDataService.getById(serieId).pipe(
      map(serie => serie.seasons.find(season => season.id == seasonId)!)
    );
    console.log(this.season$);
  }

  getSortedEpisodes(episodes: Episode[]) : Episode[]{
    return episodes.slice().sort((a, b) => a.episodeNumber - b.episodeNumber);
  }

  protected readonly faStar = faStar;
}
