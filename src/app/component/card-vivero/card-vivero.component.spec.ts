import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViveroComponent } from './card-vivero.component';

describe('CardViveroComponent', () => {
  let component: CardViveroComponent;
  let fixture: ComponentFixture<CardViveroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardViveroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardViveroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
