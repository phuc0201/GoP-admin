import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyDetailsComponent } from '../journeys/journey-details/journey-details.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
    title: 'Users',
  },
  {
    path: 'customers',
    component: CustomerDetailsComponent,
    title: 'Users'
  },
  {
    path: 'drivers',
    component: DriverDetailsComponent,
    title: 'Users'
  },
  {
    path: 'customers/trip-detail',
    component: JourneyDetailsComponent,
    title: 'Trip details'
  },
  {
    path: 'drivers/trip-detail',
    component: JourneyDetailsComponent,
    title: 'Trip details'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
