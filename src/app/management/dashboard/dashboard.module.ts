import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { WidgetChartCardComponent } from './widget-chart-card/widget-chart-card.component';
import { CircleChartCardComponent } from './circle-chart-card/circle-chart-card.component';
import { LineChartCardComponent } from './line-chart-card/line-chart-card.component';
import { TopDriversComponent } from './top-drivers/top-drivers.component';
import { MapComponent } from './map/map.component';
import { NgChartsModule } from 'ng2-charts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgApexchartsModule } from "ng-apexcharts";
@NgModule({
  declarations: [
    DashboardComponent,
    WidgetChartCardComponent,
    CircleChartCardComponent,
    LineChartCardComponent,
    TopDriversComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    NzGridModule,
    GoogleMapsModule,
    LeafletModule,
    NgApexchartsModule,
  ]
})
export class DashboardModule { }
