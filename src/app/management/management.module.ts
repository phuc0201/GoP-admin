import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { layoutsManagementModule } from '../layouts/management/management.module';
import { ManagementRoutingModule } from './management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    layoutsManagementModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class ManagementModule { }
