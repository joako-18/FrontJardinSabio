import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginviveroComponent } from './loginvivero.component';

describe('LoginviveroComponent', () => {
  let component: LoginviveroComponent;
  let fixture: ComponentFixture<LoginviveroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginviveroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginviveroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
