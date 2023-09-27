import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleChartCardComponent } from './circle-chart-card.component';

describe('CircleChartCardComponent', () => {
  let component: CircleChartCardComponent;
  let fixture: ComponentFixture<CircleChartCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircleChartCardComponent]
    });
    fixture = TestBed.createComponent(CircleChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
