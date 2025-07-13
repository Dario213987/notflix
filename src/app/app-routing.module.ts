import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieListComponent} from './movie-list/movie-list.component';
import {SeriesListComponent} from './series-list/series-list.component';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {SeriesDetailsComponent} from './series-details/series-details.component';
import {SeasonDetailsComponent} from './season-details/season-details.component';
import {MovieDetailsContainerComponent} from './movie-details-container/movie-details-container.component';
import {SeriesDetailsContainerComponent} from './series-details-container/series-details-container.component';

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
    component: MovieDetailsContainerComponent,
    children: [
      { path: '', component: MovieDetailsComponent },
    ]
  },
  {
    path: 'series',
    component: SeriesListComponent
  },
  {
    path: 'series/:id',
    component: SeriesDetailsContainerComponent,
    children: [
      { path: '', component: SeriesDetailsComponent },
      { path: 'temporada/:seasonId', component: SeasonDetailsComponent },
    ]
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
