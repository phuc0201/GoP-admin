import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListJourneysComponent } from '../journeys/list-journeys/list-journeys.component';
import { JourneyDetailsComponent } from '../journeys/journey-details/journey-details.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
    title:'Users',
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    title:'Users'
  },
  {
    path: ':uid/journeys/:jid',
    component: JourneyDetailsComponent,
    title:'Users'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
