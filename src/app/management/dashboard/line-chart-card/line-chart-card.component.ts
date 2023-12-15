import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { IOrderByTime } from 'src/app/core/model/management/order.model';
@Component({
  selector: 'app-line-chart-card',
  templateUrl: './line-chart-card.component.html',
  styleUrls: ['./line-chart-card.component.scss']
})
export class LineChartCardComponent implements OnInit, OnChanges {
  @Input() orderByTime?: IOrderByTime[];
  title = 'ng2-charts-demo';
  chartOption = 'month';
  lineChartOptions!: ChartOptions<'line'>;
  lineChartData: ChartConfiguration<'line'>['data'] = {
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
        label: 'Số đơn hàng',
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

  lineChartLegend = true;
  setActive(item: string) {
    this.chartOption = item;
  }

  initChart(): void {
    if (this.orderByTime) {
      this.lineChartData.labels = [];
      this.lineChartData.datasets[0].data = [];
      this.orderByTime.forEach((data) => {
        this.lineChartData.labels?.push(data.date);
        this.lineChartData.datasets[0].data.push(data.total);
      });
    }
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
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
  }
  ngOnInit(): void {
    // this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initChart();
    // console.log(this.lineChartData);
  }
}
