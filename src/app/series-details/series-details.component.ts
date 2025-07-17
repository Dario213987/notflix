import { Component } from '@angular/core';
import {map, Observable} from 'rxjs';
import {Serie} from '../models/Serie';
import {SeriesDataService} from '../series-data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-series-details',
  standalone: false,
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.scss'
})
export class SeriesDetailsComponent {
  serie$: Observable<Serie | undefined>;

  constructor(private seriesDataService: SeriesDataService,
              private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.seriesDataService.getById(id);
    this.serie$ = this.seriesDataService.seriesList$.pipe(
      map(sls => sls.find(s => s.id == id))
    );
  }
}
