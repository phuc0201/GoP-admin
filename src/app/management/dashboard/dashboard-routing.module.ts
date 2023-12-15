import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyDetailsComponent } from '../journeys/journey-details/journey-details.component';
import { DriverDetailsComponent } from '../users/driver-details/driver-details.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'driver-details/trips/details',
    component: JourneyDetailsComponent,
    title: 'Trips'
  },
  {
    path: 'driver-details',
    component: DriverDetailsComponent,
    title: 'Driver'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
