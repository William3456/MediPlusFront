import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGlucosaComponent } from './ver-glucosa.component';

describe('VerGlucosaComponent', () => {
  let component: VerGlucosaComponent;
  let fixture: ComponentFixture<VerGlucosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerGlucosaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerGlucosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
