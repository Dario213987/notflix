import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {Serie} from './models/Serie';
import {Season} from './models/Season';
import {Episode} from './models/Episode';
@Injectable({
  providedIn: 'root'
})
export class SeriesDataService {

  private seriesListSubject = new BehaviorSubject<Serie[]>([]);

  seriesList$ = this.seriesListSubject.asObservable();

  private pageNumber = 1;

  constructor(private http: HttpClient) {
  }

  nextPage(): void {
    this.http.get<Serie[]>(`${environment.mockApiBaseUrl}/series?_page=${this.pageNumber}&_limit=${environment.defaultPageSize}`)
      .pipe(
        map(seriesArray => seriesArray.map(s => this.mapSerie(s))) //Benditos sean los pipes
      )
      .subscribe(mappedSeries => {
        const ls:Serie[] = this.seriesListSubject.getValue();
        this.seriesListSubject.next([...ls, ...mappedSeries]);
        this.pageNumber++;
      });
  }

  initialize():void{
    if(this.seriesListSubject.getValue().length == 0){
      this.nextPage();
    }
  }

  getById(id: number): Observable<Serie> {
    const serie = this.seriesListSubject.getValue().find(s => s.id == id);

    if (serie) {
      return of(serie);
    }

    return this.http.get<Serie[]>(`${environment.mockApiBaseUrl}/series?id=${id}`).pipe(
      map(items => items[0])
    );
  }

  private mapSerie(s: Serie): Serie {
    return {
      ...s,
      route: ['/','series', s.id.toString()],
      seasons: s.seasons.map(season => this.mapSeason(season, s.id))
    };
  }

  private mapSeason(s: Season, serieId: number): Season {
    return {
      ...s,
      route: ['/','series', serieId.toString(), 'temporada', s.id.toString()],
      episodes: s.episodes.map(e => this.mapEpisode(e, serieId, s.id))
    };
  }

  private mapEpisode(e: Episode, serieId: number, seasonId: number): Episode {
    return {
      ...e,
      route: ['/','series', serieId.toString(), 'temporada', seasonId.toString(), 'episodio', e.id.toString()],
    };
  }

}
