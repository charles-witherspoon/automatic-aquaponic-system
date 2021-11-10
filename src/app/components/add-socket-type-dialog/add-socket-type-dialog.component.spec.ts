import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocketTypeDialogComponent } from './add-socket-type-dialog.component';

describe('AddSocketTypeDialogComponent', () => {
  let component: AddSocketTypeDialogComponent;
  let fixture: ComponentFixture<AddSocketTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocketTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocketTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
