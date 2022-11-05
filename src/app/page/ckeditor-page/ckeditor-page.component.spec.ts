import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorPageComponent } from './ckeditor-page.component';

describe('CkeditorPageComponent', () => {
  let component: CkeditorPageComponent;
  let fixture: ComponentFixture<CkeditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkeditorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CkeditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
