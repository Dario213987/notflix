import { Component } from '@angular/core';
import {map, Observable, switchMap, take} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import {SeriesDataService} from '../series-data.service';
import {Serie} from '../models/Serie';
import {Favorito} from '../models/Favorito';
import {FavoritosDataService} from '../favoritos-data.service';

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
  favorito$: Observable<Favorito | undefined>;
  mostrarPopup: boolean = false;


  constructor(private seriesDataService: SeriesDataService,
              private favoritosDataService: FavoritosDataService,
              private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.serie$ = this.seriesDataService.getById(id);

    this.favorito$ = this.favoritosDataService.favoritosList$.pipe(
      switchMap(() => this.serie$.pipe(
        switchMap(pelicula => this.favoritosDataService.getByMediaIdAndMediaType(pelicula.id, 'película'))
      ))
    );
  }

  favoriteStore(data: { rating: number; review: string }) {

    this.serie$.pipe(
      map(serie => ({
        mediaId: serie.id,
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
