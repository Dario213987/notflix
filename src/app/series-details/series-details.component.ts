import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import {SeriesDataService} from '../series-data.service';
import {Serie} from '../models/Serie';

@Component({
  selector: 'app-series-details',
  standalone: false,
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.scss'
})
export class SeriesDetailsComponent {
  faHeart = faHeart;
  faStar = faStar;
  serie$: Observable<Serie>;

  constructor(private seriesDataService: SeriesDataService,
              private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.serie$ = this.seriesDataService.getById(id);
  }
}
