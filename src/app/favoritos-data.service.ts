import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Movie} from './models/Movie';
import {Favorito} from './models/Favorito';

@Injectable({
  providedIn: 'root'
})
export class FavoritosDataService {
  private favoritosListSubject = new BehaviorSubject<Favorito[]>([]);

  favoritosList$ = this.favoritosListSubject.asObservable();

  private pageNumber = 1;

  constructor(private http: HttpClient) {
  }

  nextPage(): void {
    this.http.get<Favorito[]>(`${environment.mockApiBaseUrl}/favoritos?_page=${this.pageNumber}&_limit=${environment.defaultPageSize}`)
      .pipe(
        switchMap(favoritos => {
          if (!favoritos.length) return of([]);

          const observables = favoritos.map(fav => {
            const url = fav.mediaType === 'pelicula'
              ? `${environment.mockApiBaseUrl}/peliculas?id=${fav.mediaId}`
              : `${environment.mockApiBaseUrl}/series?id=${fav.mediaId}`;

            return this.http.get<Movie[]>(url).pipe(
              map(items => {
                fav.mediaItem = items[0];
                return fav;
              })
            );
          });

          return forkJoin(observables);
        })
      )
      .subscribe(favoritosConMedia => {
        const ls = this.favoritosListSubject.getValue();
        this.favoritosListSubject.next([...ls, ...favoritosConMedia]);
        this.pageNumber++;
      });
  }

  initialize():void{
    if(this.favoritosListSubject.getValue().length == 0){
      this.nextPage();
    }
  }

  getById(id: number): Observable<Favorito> {
    const favorito:Favorito|undefined = this.favoritosListSubject.getValue().find(s => s.id == id);

    if (favorito) {
      return of(favorito);
    }

    return this.http.get<Favorito[]>(`${environment.mockApiBaseUrl}/peliculas?id=${id}`).pipe(
      map(items => items[0])
    );
  }
}
