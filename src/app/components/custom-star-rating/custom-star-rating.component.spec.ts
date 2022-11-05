import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStarRatingComponent } from './custom-star-rating.component';

describe('CustomStarRatingComponent', () => {
  let component: CustomStarRatingComponent;
  let fixture: ComponentFixture<CustomStarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomStarRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
