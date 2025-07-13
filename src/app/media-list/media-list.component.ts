import {Component, Input} from '@angular/core';
import {MediaItem} from '../models/MediaItem';

@Component({
  selector: 'app-media-list',
  standalone: false,
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss'
})
export class MediaListComponent {
  @Input() items: MediaItem[] = [];
}
