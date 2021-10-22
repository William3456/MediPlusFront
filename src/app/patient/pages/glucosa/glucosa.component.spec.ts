import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlucosaComponent } from './glucosa.component';

describe('GlucosaComponent', () => {
  let component: GlucosaComponent;
  let fixture: ComponentFixture<GlucosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlucosaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlucosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
