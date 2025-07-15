import {Component, EventEmitter, Output} from '@angular/core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popup-container',
  standalone: false,
  templateUrl: './popup-container.component.html',
  styleUrl: './popup-container.component.scss'
})
export class PopupContainerComponent {
  @Output() cerrar = new EventEmitter<void>();
  faArrowLeft = faArrowLeft;
  cerrarPopup() {
    this.cerrar.emit();
  }

}
