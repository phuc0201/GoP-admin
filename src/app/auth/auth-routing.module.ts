import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverLoginComponent } from './driver-login/driver-login.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { driverGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'driver/login',
    pathMatch: 'full',
  },
  {
    path: 'admin/login',
    component: LoginComponent,
    title: 'Đăng nhập',
  },
  {
    path: 'driver/register',
    component: RegisterComponent,
    title: 'Đăng ký đối tác tài xế'
  },
  {
    path: 'driver/login',
    component: DriverLoginComponent,
    title: 'Đăng nhập'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'Đổi mật khẩu'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
