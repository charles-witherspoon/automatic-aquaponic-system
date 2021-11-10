import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetScheduleDialogComponent } from './set-schedule-dialog.component';

describe('SetScheduleDialogComponent', () => {
  let component: SetScheduleDialogComponent;
  let fixture: ComponentFixture<SetScheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetScheduleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
