import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyDetailsComponent } from './journey-details/journey-details.component';
import { ListJourneysComponent } from './list-journeys/list-journeys.component';

const routes: Routes = [
  {
    path: '',
    component: ListJourneysComponent,
    title: 'Trips'
  },
  {
    path: 'details',
    component: JourneyDetailsComponent,
    title: 'Trip details'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneysRoutingModule { }
