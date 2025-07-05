import { Component } from '@angular/core';
import {PeliculasDataService} from '../peliculas-data.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  constructor(public peliculasDataService: PeliculasDataService) {
  }


  ngOnInit() {
    this.peliculasDataService.initialize();
  }
}
