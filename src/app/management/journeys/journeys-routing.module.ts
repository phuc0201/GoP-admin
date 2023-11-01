import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyDetailsComponent } from './journey-details/journey-details.component';
import { ListJourneysComponent } from './list-journeys/list-journeys.component';

const routes: Routes = [
  {
    path: '',
    component: ListJourneysComponent,
    title: 'Journeys'
  },
  {
    path: ':id',
    component: JourneyDetailsComponent,
    title: 'Journeys'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneysRoutingModule { }
