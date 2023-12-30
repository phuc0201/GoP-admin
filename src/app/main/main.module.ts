import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutModule } from '../layouts/main-layout/main-layout.module';
import { PaymentComponent } from './payment/payment.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [

    PaymentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainLayoutModule,
    NzGridModule,
  ]
})
export class MainModule { }
