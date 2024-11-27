import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNurseryDialogComponent } from './create-nursery-dialog.component';

describe('CreateNurseryDialogComponent', () => {
  let component: CreateNurseryDialogComponent;
  let fixture: ComponentFixture<CreateNurseryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNurseryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNurseryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
