import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthDataDashboardComponent } from './growth-data-dashboard.component';

describe('GrowthDataDashboardComponent', () => {
  let component: GrowthDataDashboardComponent;
  let fixture: ComponentFixture<GrowthDataDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowthDataDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthDataDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
