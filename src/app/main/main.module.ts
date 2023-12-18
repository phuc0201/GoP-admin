import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutModule } from '../layouts/main-layout/main-layout.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainLayoutModule
  ]
})
export class MainModule { }
