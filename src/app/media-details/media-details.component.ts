import {Component, Input, signal, SimpleChanges} from '@angular/core';
import { Movie } from '../models/Movie';
import {Serie} from '../models/Serie';
import {Favorito} from '../models/Favorito';
import {faHeart,  faStar} from '@fortawesome/free-solid-svg-icons';
import {FavoritosDataService} from '../favoritos-data.service';
import {Season} from '../models/Season';
import {Episode} from '../models/Episode';
import {MediaItem} from '../models/MediaItem';

@Component({
  selector: 'app-media-details',
  standalone: false,
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss'
})
export class MediaDetailsComponent {
  @Input() item!: MediaItem;
  @Input() tipo!: "película" | "serie";
  faHeart = faHeart;
  favorito = signal<Favorito | undefined>(undefined);
  faStar = faStar;
  mostrarPopup: boolean = false;

  constructor(private favoritosDataService: FavoritosDataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['item'] || changes['tipo']) && this.item && this.tipo) {

      this.favoritosDataService.getByMediaIdAndMediaType(this.item.id, this.tipo)
        .subscribe(fav => this.favorito.set(fav));
    }

  }

  favoriteStore(data: { rating: number; review: string }) {
    this.favoritosDataService.submitFavorite({
      mediaId: this.item.id,
      mediaType: this.tipo,
      ...data,
    }).subscribe(fav => this.favorito.set(fav));
    this.mostrarPopup = false;
  }

  showPopUp() {
    if (!this.favorito()) {
      this.mostrarPopup = true;
    } else {
      this.favoritosDataService.deleteFavorite(this.favorito()!.id);
      this.favorito.set(undefined);
    }
  }

  isSerie(item: MediaItem): item is Serie {
    return (item as Serie).seasons !== undefined;
  }

  isSeason(item: MediaItem): item is Season {
    return (item as Season).episodes !== undefined;
  }

  isMovie(item: MediaItem): item is Movie {
    return (item as Movie).runTimeTicks !== undefined;
  }
  getSortedEpisodes(episodes: Episode[]) : Episode[]{
    return episodes.slice().sort((a, b) => a.episodeNumber - b.episodeNumber);
  }
}
