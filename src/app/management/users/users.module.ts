import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ListUsersComponent } from './list-users/list-users.component';
import { BreadcrumbComponent } from 'src/app/shared/widget/breadcrumb/breadcrumb.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { LoaderComponent } from 'src/app/shared/widget/loader/loader.component';
import { WidgetChartCardComponent } from 'src/app/shared/component-shared/widget-chart-card/widget-chart-card.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
@NgModule({
  declarations: [
    ListUsersComponent,
    CustomerDetailsComponent,
    DriverDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzTableModule,
    NzTagModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    BreadcrumbComponent,
    NzSelectModule,
    FormsModule,
    NgxSpinnerModule,
    LoaderComponent,
    WidgetChartCardComponent,
    NzGridModule
  ]
})
export class UsersModule { }
