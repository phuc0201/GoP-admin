import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-widget-chart-card',
  templateUrl: './widget-chart-card.component.html',
  styleUrls: ['./widget-chart-card.component.scss']
})
export class WidgetChartCardComponent {
  @Input() title: string = '';
  @Input() percent: number = 0;
  @Input() totalData: string = '';
  constructor(){}
}
