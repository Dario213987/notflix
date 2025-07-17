import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieListComponent} from './movie-list/movie-list.component';
import {SeriesListComponent} from './series-list/series-list.component';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';
import {SeasonDetailsComponent} from './season-details/season-details.component';
import {MovieDetailsPageComponent} from './movie-details-page/movie-details-page.component';
import {SeriesDetailsPageComponent} from './series-details-page/series-details-page.component';
import {SeriesDetailsComponent} from './series-details/series-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'peliculas',
    pathMatch: 'full'
  },

  {
    path: 'peliculas',
    component: MovieListComponent
  },
  {
    path: 'peliculas/:id',
    component: MovieDetailsPageComponent,
  },
  {
    path: 'series',
    component: SeriesListComponent
  },
  {
    /* Esta ruta la hice diferente para evitar que el componente que contiene
     la imagen de fondo de la serie se destruya y se cree nuevamente, lo cual
      causa que la pantalla titile al ir a un temporada o volver a una serie */
    path: 'series/:id',
    component: SeriesDetailsPageComponent,
    children: [
      {
        path: '',
        component: SeriesDetailsComponent
      },
      {
        path: 'temporada/:seasonId',
        component: SeasonDetailsComponent
      }
    ]
  },
  {
    path: 'series/:id/temporada/:seasonId',
    component: SeasonDetailsComponent
  },
  {
    path: 'favoritos',
    component: FavoriteListComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
