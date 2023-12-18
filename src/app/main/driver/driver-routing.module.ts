import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';

const routes: Routes = [
  {
    path: '',
    component: DriverProfileComponent,
    title: 'Driver',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
