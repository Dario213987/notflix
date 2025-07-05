import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieListComponent} from './movie-list/movie-list.component';
import {SeriesListComponent} from './series-list/series-list.component';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';

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
    path: 'series',
    component: SeriesListComponent
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
