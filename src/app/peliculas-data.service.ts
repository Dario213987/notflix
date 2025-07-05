import { Injectable } from '@angular/core';
import { MediaItem } from './models/MediaItem';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeliculasDataService {

  private peliculasListSubject = new BehaviorSubject<MediaItem[]>([]);

  peliculasList$ = this.peliculasListSubject.asObservable();

  private pageNumber = 1;

  constructor(private http: HttpClient) { }

  nextPage(): void{
    this.http.get<MediaItem[]>(`${environment.mockApiBaseUrl}/peliculas?p=${this.pageNumber}&l=${environment.defaultPageSize}`)
      .subscribe(peliculas => {
          const ls: MediaItem[] = this.peliculasListSubject.getValue();
          this.peliculasListSubject.next([...ls, ...peliculas]);
          this.pageNumber++;
      });
  }

  initialize(){
    if(this.peliculasListSubject.getValue().length == 0){
      this.nextPage();
    }
  }

  getById(id: number): Observable<MediaItem> {
    const pelicula:MediaItem|undefined = this.peliculasListSubject.getValue().find(s => s.id == id);

    if (pelicula) {
      return of(pelicula);
    }

    return this.http.get<MediaItem[]>(`${environment.mockApiBaseUrl}/peliculas?id=${id}`).pipe(
      map(items => items[0])
    );
  }
}
