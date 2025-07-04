import { Component } from '@angular/core';
import { Pelicula} from '../models/Pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

    peliculas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {
  }

  ngOnInit() {
    this.peliculasService.getDataPaginated();
    this.peliculasService.peliculasList.subscribe(p => this.peliculas = p);
  }

  ngOnDestroy() {
    this.peliculasService.peliculasList.unsubscribe();
  }
}
