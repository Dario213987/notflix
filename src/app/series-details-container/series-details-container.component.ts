import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Serie} from '../models/Serie';
import {SeriesDataService} from '../series-data.service';

@Component({
  selector: 'app-series-details-container',
  standalone: false,
  templateUrl: './series-details-container.component.html',
  styleUrl: './series-details-container.component.scss'
})
export class SeriesDetailsContainerComponent {

  serie$: Observable<Serie>;

  constructor(private seriesDataService: SeriesDataService,
              private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.serie$ = this.seriesDataService.getById(id);
  }
}
