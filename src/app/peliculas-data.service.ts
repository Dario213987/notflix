import { Injectable } from '@angular/core';
import { Movie } from './models/Movie';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
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
        map(movieArray => movieArray.map(m => this.mapMovie(m))) //Benditos sean los pipes
      )
      .subscribe(peliculas => {
          const ls: Movie[] = this.peliculasListSubject.getValue();
          this.peliculasListSubject.next([...ls, ...peliculas]);
          this.pageNumber++;
      });
  }

  initialize(){
    if(this.peliculasListSubject.getValue().length == 0){
      this.nextPage();
    }
  }

  getById(id: number): Observable<Movie> {
    const pelicula:Movie|undefined = this.peliculasListSubject.getValue().find(s => s.id == id);

    if (pelicula) {
      return of(pelicula);
    }

    return this.http.get<Movie[]>(`${environment.mockApiBaseUrl}/peliculas?id=${id}`).pipe(
      map(items => this.mapMovie(items[0]))
    );
  }


  private mapMovie(m: Movie): Movie {
    return {
      ...m,
      route: ['/','peliculas', m.id.toString()]
    };
  }
}
