import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaItem } from '../models/MediaItem';

@Component({
  selector: 'app-favorite-form',
  templateUrl: './favorite-form.component.html',
  standalone: false
})
export class FavoriteFormComponent {
  @Output() submitForm = new EventEmitter<{ rating: number; review: string }>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      review: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
