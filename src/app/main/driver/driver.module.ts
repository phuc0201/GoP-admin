import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { DriverRoutingModule } from './driver-routing.module';
import { ImageCroppingComponent } from 'src/app/shared/component-shared/image-cropping/image-cropping.component';
import { BlobToBase64Pipe } from 'src/app/shared/widget/pipes/blob-to-base64.pipe';
import { LoaderComponent } from 'src/app/shared/widget/loader/loader.component';


@NgModule({
  declarations: [
    DriverProfileComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    NzButtonModule,
    FormsModule,
    NzFormModule,
    NzModalModule,
    ImageCroppingComponent,
    BlobToBase64Pipe,
    LoaderComponent
  ]
})
export class DriverModule { }
