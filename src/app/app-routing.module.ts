import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { administrationGuard, driverGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'administration/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    title: 'Login'
  },
  {
    path: 'administration',
    loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
    title: 'Administration',
    canActivate: [administrationGuard]
  },
  {
    path: 'driver',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    title: 'Driver',
    canActivate: [driverGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
