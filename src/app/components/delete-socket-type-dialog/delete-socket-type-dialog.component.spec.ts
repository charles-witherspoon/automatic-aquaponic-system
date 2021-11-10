import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSocketTypeDialogComponent } from './delete-socket-type-dialog.component';

describe('DeleteSocketTypeDialogComponent', () => {
  let component: DeleteSocketTypeDialogComponent;
  let fixture: ComponentFixture<DeleteSocketTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSocketTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSocketTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
