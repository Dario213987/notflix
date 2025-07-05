import { Component } from '@angular/core';
import {SeriesDataService} from '../series-data.service';

@Component({
  selector: 'app-series-list',
  standalone: false,
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.scss'
})
export class SeriesListComponent {
  constructor(public seriesDataService: SeriesDataService) {
  }

  ngOnInit() {
    this.seriesDataService.initialize();
  }
}
