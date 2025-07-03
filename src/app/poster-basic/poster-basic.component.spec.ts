import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterBasicComponent } from './poster-basic.component';

describe('PosterBasicComponent', () => {
  let component: PosterBasicComponent;
  let fixture: ComponentFixture<PosterBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosterBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosterBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
