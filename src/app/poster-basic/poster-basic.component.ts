import {Component, Input} from '@angular/core';
import { Pelicula } from '../models/Pelicula';
@Component({
  selector: 'app-poster-basic',
  standalone: false,
  templateUrl: './poster-basic.component.html',
  styleUrl: './poster-basic.component.scss'
})
export class PosterBasicComponent {
  loading: boolean = true;
  @Input() pelicula!: Pelicula;

  onLoad(){
    this.loading = false;
  }

  onError(){
    //TODO: poner imagen de error
  }
}
