import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementLayoutComponent } from '../layouts/management-layout/management-layout/management-layout.component';

const routes: Routes = [
  {
    path:'',
    component: ManagementLayoutComponent,
    title: 'Administration',
    children:[
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'trips',
        loadChildren: () => import('./journeys/journeys.module').then(m => m.JourneysModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
