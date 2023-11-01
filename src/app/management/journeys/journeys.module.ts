import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { JourneyDetailsComponent } from './journey-details/journey-details.component';
import { JourneysRoutingModule } from './journeys-routing.module';
import { ListJourneysComponent } from './list-journeys/list-journeys.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { JourneyMapComponent } from './journey-map/journey-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  declarations: [
    JourneyDetailsComponent,
    ListJourneysComponent,
    JourneyMapComponent,
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
    LeafletModule
  ]
})
export class JourneysModule { }
