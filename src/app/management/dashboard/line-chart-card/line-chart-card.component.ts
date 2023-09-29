import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
@Component({
  selector: 'app-line-chart-card',
  templateUrl: './line-chart-card.component.html',
  styleUrls: ['./line-chart-card.component.scss']
})
export class LineChartCardComponent {
  title = 'ng2-charts-demo';
  chartOption = 'month';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Số tài xế',
        fill: true,
        tension: 0.4,
        borderColor: '#4a40e7',
        backgroundColor: '#f7f8ff',
        pointBackgroundColor: '#4a40e7',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,

      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  public lineChartLegend = true;
  setActive(item: string) {
    this.chartOption = item;
  }
}
