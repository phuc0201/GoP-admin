import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { WidgetChartCardComponent } from './widget-chart-card/widget-chart-card.component';
import { CircleChartCardComponent } from './circle-chart-card/circle-chart-card.component';
import { LineChartCardComponent } from './line-chart-card/line-chart-card.component';
import { TopDriversComponent } from './top-drivers/top-drivers.component';
import { MapComponent } from './map/map.component';




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
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
