import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlantDialogComponent } from './edit-plant-dialog.component';

describe('EditPlantDialogComponent', () => {
  let component: EditPlantDialogComponent;
  let fixture: ComponentFixture<EditPlantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
