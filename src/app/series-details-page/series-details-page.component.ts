import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Serie} from '../models/Serie';
import {SeriesDataService} from '../series-data.service';

@Component({
  selector: 'app-series-details-page',
  standalone: false,
  templateUrl: './series-details-page.component.html',
  styleUrl: './series-details-page.component.scss'
})
export class SeriesDetailsPageComponent {

  serie$: Observable<Serie | undefined>;

  constructor(private seriesDataService: SeriesDataService,
              private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.serie$ = this.seriesDataService.getById(id);
  }
}
