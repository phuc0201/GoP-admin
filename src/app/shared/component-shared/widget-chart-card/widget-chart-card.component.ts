import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export const pluginsModules = [
  CommonModule,
  RouterModule,
];
@Component({
  selector: 'app-widget-chart-card',
  templateUrl: './widget-chart-card.component.html',
  styleUrls: ['./widget-chart-card.component.scss'],
  standalone: true,
  imports: pluginsModules
})
export class WidgetChartCardComponent {
  @Input() title: string = '';
  @Input() percent: number = 0;
  @Input() totalData: number = 0;
  constructor() { }
}
