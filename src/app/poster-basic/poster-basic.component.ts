import {Component, Input} from '@angular/core';
import {environment} from '../../environments/environment';
import {MediaItem} from '../models/MediaItem';
@Component({
  selector: 'app-poster-basic',
  standalone: false,
  templateUrl: './poster-basic.component.html',
  styleUrl: './poster-basic.component.scss'
})
export class PosterBasicComponent {
  loading: boolean = true;
  @Input() item!: MediaItem;

  onLoad(){
    setTimeout(() => {
      this.loading = false;
    }, environment.minimumSkeletonAnimationTime);
    }

  onError(){
    //TODO: poner imagen de error
  }
}
