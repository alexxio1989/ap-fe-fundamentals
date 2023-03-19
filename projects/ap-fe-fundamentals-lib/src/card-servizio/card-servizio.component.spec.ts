import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardServizioComponent } from './card-servizio.component';

describe('CardServizioComponent', () => {
  let component: CardServizioComponent;
  let fixture: ComponentFixture<CardServizioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardServizioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardServizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
