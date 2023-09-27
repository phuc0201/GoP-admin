import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartCardComponent } from './line-chart-card.component';

describe('LineChartCardComponent', () => {
  let component: LineChartCardComponent;
  let fixture: ComponentFixture<LineChartCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineChartCardComponent]
    });
    fixture = TestBed.createComponent(LineChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
