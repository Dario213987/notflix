import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab-selector',
  standalone: false,
  templateUrl: './tab-selector.component.html',
  styleUrl: './tab-selector.component.scss'
})
export class TabSelectorComponent {
  @Input() selected: string = 'movies';
  @Output() tabChanged = new EventEmitter<string>();

  selectTab(tab: string) {
    this.selected = tab;
    this.tabChanged.emit(tab);
  }
}
