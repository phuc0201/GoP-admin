import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ManagementLayoutModule } from '../layouts/management-layout/management-layout.module';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    ManagementLayoutModule,
    NzGridModule,
  ]
})
export class ManagementModule { }
