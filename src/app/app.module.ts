import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabSelectorComponent } from './tab-selector/tab-selector.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PosterBasicComponent } from './poster-basic/poster-basic.component';
import {NgOptimizedImage} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MediaListComponent } from './media-list/media-list.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SeasonDetailsComponent } from './season-details/season-details.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { SeriesDetailsPageComponent } from './series-details-page/series-details-page.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PopupContainerComponent } from './popup-container/popup-container.component';
import {FavoriteFormComponent} from './favorite-form/favorite-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MediaDetailsContainerComponent } from './media-details-container/media-details-container.component';
import { MediaDetailsComponent } from './media-details/media-details.component';
import { TicksToTimePipe } from './pipes/ticks-to-time.pipe';
import { SeriesDetailsComponent } from './series-details/series-details.component';
@NgModule({
  declarations: [
    AppComponent,
    TabSelectorComponent,
    HeaderComponent,
    PosterBasicComponent,
    MediaListComponent,
    MovieListComponent,
    SeriesListComponent,
    FavoriteListComponent,
    SeasonDetailsComponent,
    MovieDetailsPageComponent,
    SeriesDetailsPageComponent,
    PopupContainerComponent,
    FavoriteFormComponent,
    MediaDetailsContainerComponent,
    MediaDetailsComponent,
    TicksToTimePipe,
    SeriesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgOptimizedImage,
    HttpClientModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
