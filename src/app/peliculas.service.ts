import { Injectable } from '@angular/core';
import { Pelicula } from './models/Pelicula';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private _peliculasList: Pelicula[] = [];
  peliculasList : BehaviorSubject<Pelicula[]> = new BehaviorSubject(this._peliculasList);
  private pageNumber = 1;
  constructor(private http: HttpClient) { }

  getDataPaginated(): void{
    this.http.get<Pelicula[]>(`${environment.mockApiBaseUrl}/peliculas?p=${this.pageNumber}&l=${environment.defaultPageSize}`)
      .subscribe(peliculas => {
      if (peliculas.length > 0) {
        this._peliculasList = [...this._peliculasList, ...peliculas];
        this.peliculasList.next(this._peliculasList);
        this.pageNumber++;
      }
    });  }


}
