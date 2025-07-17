import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, map, Observable, of, switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Movie} from './models/Movie';
import {Favorito} from './models/Favorito';
import {Serie} from './models/Serie';
import {SeriesDataService} from './series-data.service';
import {PeliculasDataService} from './peliculas-data.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosDataService {
  private favoritosListSubject = new BehaviorSubject<Favorito[]>([]);
  favoritosList$ = this.favoritosListSubject.asObservable();

  private pageNumber = 1;

  constructor(private http: HttpClient,
              private peliculasDataService: PeliculasDataService,
              private seriesDataService: SeriesDataService,) {}

  nextPage(): void {
    this.http.get<Favorito[]>(`${environment.mockApiBaseUrl}/favoritos?_page=${this.pageNumber}&_limit=${environment.defaultPageSize}`)
      .pipe(
        switchMap(favoritos => {
          if (!favoritos.length) return of([]);
          return forkJoin(favoritos.map(fav => this.mapearMediaItem(fav)));
        })
      )
      .subscribe(favoritosConMedia => {
        const ls = this.favoritosListSubject.getValue();
        const nuevos = favoritosConMedia.filter(f => !ls.some(c => c.id == f.id))
        this.favoritosListSubject.next([...ls, ...nuevos]);
        this.pageNumber++;
      });
  }

  initialize(): void {
    if (this.favoritosListSubject.getValue().length < environment.defaultPageSize) {
      this.nextPage();
    }
  }

  getByMediaIdAndMediaType(mediaId: number, mediaType: "serie" | "película"): Observable<Favorito | undefined>{
   // Para evitar consultas innecesarias al backend

    const favorito = this.favoritosListSubject.getValue()
      .find(f => f.mediaId === mediaId && f.mediaType === mediaType);

    if (favorito) {
      return of(favorito);
    }

    //

    return this.http.get<Favorito[]>(`${environment.mockApiBaseUrl}/favoritos?mediaType=${mediaType}&mediaId=${mediaId}`).pipe(
      map(items => items[0]),
      switchMap(item => item ? this.mapearMediaItem(item) : of(undefined)),
      tap(m => {
        if (m) {
          const ls = this.favoritosListSubject.getValue();
          this.favoritosListSubject.next([...ls, m]);
        }
      })
    );
  }

  private mapearMediaItem(fav: Favorito): Observable<Favorito> {
    const getItem$: Observable<Movie | Serie | undefined> =
      fav.mediaType === 'película'
        ? this.peliculasDataService.getById(fav.mediaId)
        : this.seriesDataService.getById(fav.mediaId);

    return getItem$.pipe(
      map(item => {
        fav.mediaItem = item;
        return fav;
      })
    );
  }

  submitFavorite(fav: Omit<Favorito, 'id'>): Observable<Favorito> {
    return this.http.post<Favorito>(`${environment.mockApiBaseUrl}/favoritos`, fav).pipe(
      switchMap(favConId => this.mapearMediaItem(favConId)),
      tap(favCompleto => {
        const actual = this.favoritosListSubject.getValue();
        this.favoritosListSubject.next([...actual, favCompleto]);
      })
    );
  }

  deleteFavorite(id: number): void {
    this.http.delete<Favorito>(`${environment.mockApiBaseUrl}/favoritos/${id}`).subscribe(() => {
      const actuales = this.favoritosListSubject.getValue();
      const filtrados = actuales.filter(fav => fav.id !== id);
      this.favoritosListSubject.next(filtrados);
    });
  }

}
