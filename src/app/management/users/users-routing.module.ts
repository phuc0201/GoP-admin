import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { JourneyDetailsComponent } from '../journeys/journey-details/journey-details.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
    title:'Users',
  },
  {
    path: 'customers',
    component: CustomerDetailsComponent,
    title:'Users'
  },
  {
    path: 'drivers',
    component: DriverDetailsComponent,
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
