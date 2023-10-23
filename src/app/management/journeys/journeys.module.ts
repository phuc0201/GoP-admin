import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneysRoutingModule } from './journeys-routing.module';
import { JourneysComponent } from './journeys.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    JourneysComponent
  ],
  imports: [
    CommonModule,
    JourneysRoutingModule,
    GoogleMapsModule
  ]
})
export class JourneysModule { }
