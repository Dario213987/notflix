import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {Serie} from './models/Serie';
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
    this.http.get<Serie[]>(`${environment.mockApiBaseUrl}/series?p=${this.pageNumber}&l=${environment.defaultPageSize}`)
      .subscribe(peliculas => {
        const ls: Serie[] = this.seriesListSubject.getValue();
        this.seriesListSubject.next([...ls, ...peliculas]);
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

}
