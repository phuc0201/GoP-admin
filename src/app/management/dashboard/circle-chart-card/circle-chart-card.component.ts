import { Component, Input, ViewChild, OnInit } from '@angular/core';

import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-circle-chart-card',
  templateUrl: './circle-chart-card.component.html',
  styleUrls: ['./circle-chart-card.component.scss']
})
export class CircleChartCardComponent implements OnInit {
  @Input() chartLabel : string='';
  @Input() percent : number = 0;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  constructor() {}
  ngOnInit(): void {
    this.chartOptions = {
      series: [this.percent],
      chart: {
        height: 300,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "80%",
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
            },
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: [this.chartLabel]
    };
  }
}
