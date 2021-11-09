import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlantDialogComponent } from './delete-plant-dialog.component';

describe('DeletePlantDialogComponent', () => {
  let component: DeletePlantDialogComponent;
  let fixture: ComponentFixture<DeletePlantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePlantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
