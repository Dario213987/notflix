import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabSelectorComponent } from './tab-selector/tab-selector.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { PosterBasicComponent } from './poster-basic/poster-basic.component';

@NgModule({
  declarations: [
    AppComponent,
    TabSelectorComponent,
    HeaderComponent,
    MainComponent,
    PosterBasicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
