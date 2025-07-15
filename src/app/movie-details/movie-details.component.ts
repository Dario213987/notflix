import {Component} from '@angular/core';
import {Movie} from '../models/Movie';
import {faHeart,  faStar} from '@fortawesome/free-solid-svg-icons';
import {map, Observable, switchMap, take} from 'rxjs';
import {PeliculasDataService} from '../peliculas-data.service';
import {ActivatedRoute} from '@angular/router';
import {FavoritosDataService} from '../favoritos-data.service';
import {Favorito} from '../models/Favorito';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  faHeart = faHeart;
  pelicula$: Observable<Movie>;
  favorito$: Observable<Favorito | undefined>;
  faStar = faStar;
  mostrarPopup: boolean = false;

  constructor(private peliculasDataService: PeliculasDataService,
              private favoritosDataService: FavoritosDataService,
              private route: ActivatedRoute) {

    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.pelicula$ = this.peliculasDataService.getById(id);

    this.favorito$ = this.favoritosDataService.favoritosList$.pipe(
      switchMap(() => this.pelicula$.pipe(
        switchMap(pelicula => this.favoritosDataService.getByMediaIdAndMediaType(pelicula.id, 'película'))
      ))
    );
  }

  favoriteStore(data: { rating: number; review: string }) {

    this.pelicula$.pipe(
      map(pelicula => ({
        mediaId: pelicula.id,
        mediaType: 'película' as 'película',
        ...data,
      }))
    ).subscribe(nuevoFavorito => {
      this.favoritosDataService.submitFavorite(nuevoFavorito)
        this.mostrarPopup = false;
    });

  }

  showPopUp() {
    this.favorito$.pipe(take(1)).subscribe(fav => {
      if (!fav) {
        this.mostrarPopup = true;
      } else {
        this.favoritosDataService.deleteFavorite(fav.id);
      }
    });
  }


}
