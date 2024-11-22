import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlantaComponent } from './card-planta.component';

describe('CardPlantaComponent', () => {
  let component: CardPlantaComponent;
  let fixture: ComponentFixture<CardPlantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPlantaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
