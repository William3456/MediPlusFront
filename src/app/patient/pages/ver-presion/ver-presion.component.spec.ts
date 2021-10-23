import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPresionComponent } from './ver-presion.component';

describe('VerPresionComponent', () => {
  let component: VerPresionComponent;
  let fixture: ComponentFixture<VerPresionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPresionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPresionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
