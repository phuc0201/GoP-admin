import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SystemConstant } from 'src/app/core/constants/system.constant';

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
export class WidgetChartCardComponent implements OnChanges {
  @Input() title: string = '';
  @Input() percent: number = 0;
  @Input() totalData: number = 0;
  total: string = '';
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.total = this.totalData.toString();
    if (this.title === SystemConstant.STATISTICS_TITLE.TOTAL_EARNING) {
      this.total = this.totalData.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
  }
}
