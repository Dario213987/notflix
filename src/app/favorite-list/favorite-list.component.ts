import { Component } from '@angular/core';
import {FavoritosDataService} from '../favoritos-data.service';
import {map, Observable} from 'rxjs';
import {MediaItem} from '../models/MediaItem';

@Component({
  selector: 'app-favorite-list',
  standalone: false,
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss'
})
export class FavoriteListComponent {

  favoritosMediaItems$: Observable<MediaItem[]>;

  constructor(public favoritosDataService: FavoritosDataService) {
    this.favoritosMediaItems$ = this.favoritosDataService.favoritosList$.pipe(
      map(favs => favs.map(fav => fav.mediaItem).filter(item => item != null))
    );
  }


  ngOnInit() {
    this.favoritosDataService.initialize();
  }
}
