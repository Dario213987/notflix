import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabSelectorComponent } from './tab-selector/tab-selector.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { PosterBasicComponent } from './poster-basic/poster-basic.component';
import {NgOptimizedImage} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MediaListComponent } from './media-list/media-list.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TabSelectorComponent,
    HeaderComponent,
    MainComponent,
    PosterBasicComponent,
    MediaListComponent,
    MovieListComponent,
    SeriesListComponent,
    FavoriteListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgOptimizedImage,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
