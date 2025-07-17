import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import {Movie} from '../models/Movie';
import {PeliculasDataService} from '../peliculas-data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-details-page',
  standalone: false,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss'
})
export class MovieDetailsPageComponent {
  pelicula$: Observable<Movie | undefined>;
  imageLoaded: boolean = true;

  constructor(private peliculasDataService: PeliculasDataService,
              private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.pelicula$ = this.peliculasDataService.getById(id);
  }

}
