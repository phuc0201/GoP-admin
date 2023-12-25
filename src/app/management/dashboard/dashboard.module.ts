import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgApexchartsModule } from "ng-apexcharts";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgChartsModule } from 'ng2-charts';
import { WidgetChartCardComponent } from 'src/app/shared/component-shared/widget-chart-card/widget-chart-card.component';
import { LoaderComponent } from 'src/app/shared/widget/loader/loader.component';
import { CircleChartCardComponent } from './circle-chart-card/circle-chart-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LineChartCardComponent } from './line-chart-card/line-chart-card.component';
import { MapComponent } from './map/map.component';
import { TopDriversComponent } from './top-drivers/top-drivers.component';
@NgModule({
  declarations: [
    DashboardComponent,
    CircleChartCardComponent,
    LineChartCardComponent,
    TopDriversComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    NzGridModule,
    GoogleMapsModule,
    LeafletModule,
    NgApexchartsModule,
    WidgetChartCardComponent,
    LoaderComponent,
    NzModalModule,
    NzSelectModule,
    NzFormModule,
    FormsModule
  ]
})
export class DashboardModule { }
