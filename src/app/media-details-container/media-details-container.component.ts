import {Component, Input} from '@angular/core';
import {MediaItem} from '../models/MediaItem';

@Component({
  selector: 'app-media-details-container',
  standalone: false,
  templateUrl: './media-details-container.component.html',
  styleUrl: './media-details-container.component.scss'
})
export class MediaDetailsContainerComponent {
  @Input() item!: MediaItem;
  @Input() tipo!: "película" | "serie";
  imageLoaded: boolean = true;

}
