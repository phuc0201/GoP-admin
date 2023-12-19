import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { IDriverLoginDTO } from 'src/app/core/model/auth/auth.model';
import { MakeForm } from 'src/app/core/model/common/make-form.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-driver-login',
  templateUrl: './driver-login.component.html',
  styleUrls: ['./driver-login.component.scss']
})
export class DriverLoginComponent implements OnInit {
  hidePassword: boolean = false;
  formLogin!: FormGroup<MakeForm<IDriverLoginDTO>>;
  progress: number = 100;
  createFormGroupLogin(): void {
    this.formLogin = this.fb.nonNullable.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    this.progress = 0;
    if (this.formLogin.valid) {
      let phone = '';
      if (this.formLogin.controls.phone.value[0] === '0') {
        phone = '+84' + this.formLogin.controls.phone.value.slice(1, 10);
        this.formLogin.controls.phone.setValue(phone);
      }
      this.authSvc.doDriverLoginForm(this.formLogin.value).subscribe({
        next: res => {
          if (res) {
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Login successful',
              duration: 1000,
              position: 'topRight'
            });
            this.authSvc.setToken(res.accessToken ??
              '');
            this.authSvc.setAuthData(res);
            setTimeout(() => {
              this.router.navigateByUrl(URLConstant.ROUTE.DRIVER.PROFILE);
            }, 1000);
          }
        },
        error: err => {
          this.toast.warning({
            detail: 'WARNING',
            summary: 'Login failed',
            duration: 1000,
            position: 'topRight'
          });
        },
        complete: () => {
          this.progress = 100;
        }
      });
    }
    else {
      Object.values(this.formLogin.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    this.createFormGroupLogin();
    this.authSvc.doLogout();
  }

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private authSvc: AuthService,
    private router: Router,
  ) { }
}
