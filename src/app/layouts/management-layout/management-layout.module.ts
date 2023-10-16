import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementLayoutComponent } from './management-layout/management-layout.component';
import { ManagementHeaderComponent } from './management-header/management-header.component';
import { ManagementSidebarComponent } from './management-sidebar/management-sidebar.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
@NgModule({
  declarations: [
    ManagementLayoutComponent,
    ManagementHeaderComponent,
    ManagementSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    NzGridModule,
    NzLayoutModule
  ],
  exports: [],
  providers: [],
})
export class ManagementLayoutModule { }
