import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresionComponent } from './presion.component';

describe('PresionComponent', () => {
  let component: PresionComponent;
  let fixture: ComponentFixture<PresionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
