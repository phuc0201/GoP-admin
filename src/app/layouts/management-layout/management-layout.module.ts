import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementLayoutComponent } from './management-layout/management-layout.component';
import { ManagementHeaderComponent } from './management-header/management-header.component';
import { ManagementSidebarComponent } from './management-sidebar/management-sidebar.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ManagementLayoutComponent,
    ManagementHeaderComponent,
    ManagementSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class ManagementLayoutModule { }
