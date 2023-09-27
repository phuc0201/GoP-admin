import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetChartCardComponent } from './widget-chart-card.component';

describe('WidgetChartCardComponent', () => {
  let component: WidgetChartCardComponent;
  let fixture: ComponentFixture<WidgetChartCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetChartCardComponent]
    });
    fixture = TestBed.createComponent(WidgetChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
