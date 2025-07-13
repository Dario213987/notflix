import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsContainerComponent } from './movie-details-container.component';

describe('MovieDetailsContainerComponent', () => {
  let component: MovieDetailsContainerComponent;
  let fixture: ComponentFixture<MovieDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
