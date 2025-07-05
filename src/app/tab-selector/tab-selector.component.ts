import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-tab-selector',
  standalone: false,
  templateUrl: './tab-selector.component.html',
  styleUrl: './tab-selector.component.scss'
})
export class TabSelectorComponent {
  selectedTab: number = 0;
  private routes: string[] = ['/peliculas', '/series', '/favoritos'];

  constructor(private router: Router) {
  }

  goToTab(index: number) {
    this.selectedTab = index;
    this.router.navigate([this.routes[index]]);
  }


  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.selectedTab = this.routes.findIndex(r => this.router.url.includes(r));
      if (this.selectedTab === -1) this.selectedTab = 0;
    });
  }
}
