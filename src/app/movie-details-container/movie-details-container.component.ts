import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Movie} from '../models/Movie';
import {PeliculasDataService} from '../peliculas-data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-details-container',
  standalone: false,
  templateUrl: './movie-details-container.component.html',
  styleUrl: './movie-details-container.component.scss'
})
export class MovieDetailsContainerComponent {
  pelicula$: Observable<Movie>;
  imageLoaded: boolean = true;

  constructor(private peliculasDataService: PeliculasDataService,
              private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.pelicula$ = this.peliculasDataService.getById(id);
  }

}
