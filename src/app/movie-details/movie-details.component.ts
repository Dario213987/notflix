import {Component} from '@angular/core';
import {Movie} from '../models/Movie';
import {faHeart,  faStar} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {PeliculasDataService} from '../peliculas-data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  faHeart = faHeart;
  pelicula$: Observable<Movie>;

  constructor(private peliculasDataService: PeliculasDataService,
              private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.pelicula$ = this.peliculasDataService.getById(id);
  }

  protected readonly faStar = faStar;
}
