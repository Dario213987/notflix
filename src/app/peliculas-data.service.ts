import { Injectable } from '@angular/core';
import { Movie } from './models/Movie';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import {BehaviorSubject, map, Observable, of, tap} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeliculasDataService {

  private peliculasListSubject = new BehaviorSubject<Movie[]>([]);

  peliculasList$ = this.peliculasListSubject.asObservable();

  private pageNumber = 1;

  constructor(private http: HttpClient) { }

  nextPage(): void{
    this.http.get<Movie[]>(`${environment.mockApiBaseUrl}/peliculas?_page=${this.pageNumber}&_limit=${environment.defaultPageSize}`)
      .pipe(
        map(movieArray => movieArray.map(m => this.mapMovie(m)))
      )
      .subscribe(peliculas => {
          const ls: Movie[] = this.peliculasListSubject.getValue();
          const nuevos = peliculas.filter(movieOld => !ls.some(movieNew => movieOld.id == movieNew.id))
          this.peliculasListSubject.next([...ls, ...nuevos]);
          this.pageNumber++;
      });
  }

  initialize(){
    if(this.peliculasListSubject.getValue().length < environment.defaultPageSize){
      this.nextPage();
    }
  }

  getById(id: number): Observable<Movie> {
    const movie = this.peliculasListSubject.getValue().find(p => p.id === id);
    if (movie) return of(movie);

    return this.http.get<Movie[]>(`${environment.mockApiBaseUrl}/peliculas?id=${id}`).pipe(
      map(items => items[0]),
      map(item => this.mapMovie(item)),
      tap(s => {
        if (s) {
          const ls = this.peliculasListSubject.getValue();
          if (!ls.some(serie => serie.id === s.id)) {
            this.peliculasListSubject.next([...ls, s]);
          }
        }
      })
    );
  }


  private mapMovie(m: Movie): Movie {
    return {
      ...m,
      route: ['/','peliculas', m.id.toString()]
    };
  }
}
