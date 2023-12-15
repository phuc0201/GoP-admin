import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from 'src/app/shared/widget/loader/loader.component';
import { JourneyDetailsComponent } from './journey-details/journey-details.component';
import { JourneyMapComponent } from './journey-map/journey-map.component';
import { JourneysRoutingModule } from './journeys-routing.module';
import { ListJourneysComponent } from './list-journeys/list-journeys.component';
import { BreadcrumbComponent } from 'src/app/shared/widget/breadcrumb/breadcrumb.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormOrderComponent } from './form-order/form-order.component';
import { NzFormModule } from 'ng-zorro-antd/form';
@NgModule({
  declarations: [
    JourneyDetailsComponent,
    ListJourneysComponent,
    JourneyMapComponent,
    FormOrderComponent,
  ],
  imports: [
    CommonModule,
    JourneysRoutingModule,
    NzTagModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    LeafletModule,
    LoaderComponent,
    NgxSpinnerModule,
    FormsModule,
    NzSelectModule,
    BreadcrumbComponent,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule
  ]
})
export class JourneysModule { }
