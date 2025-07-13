import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDetailsContainerComponent } from './series-details-container.component';

describe('SeriesDetailsContainerComponent', () => {
  let component: SeriesDetailsContainerComponent;
  let fixture: ComponentFixture<SeriesDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeriesDetailsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
