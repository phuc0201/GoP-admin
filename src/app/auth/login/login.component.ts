import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { ILoginDTO } from 'src/app/core/model/auth/auth.model';
import { MakeForm } from 'src/app/core/model/common/make-form.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup<MakeForm<ILoginDTO>>;

  createFormGroupLogin(): void {
    this.formLogin = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }

  onLoginWithForm(): void {
    if (this.formLogin.valid) {
      this.spinner.show();
      this.authSvc.doLoginForm(this.formLogin.value)
        .subscribe({
          next: res => {
            if (res) {
              this.authSvc.setToken(res?.accessToken ?? '');
              this.authSvc.setAuthData(res);
              this.router.navigateByUrl(URLConstant.ROUTE.ADMINISTRATION.DASHBOARD);
            } else {
              this.toast.error({ detail: "ERROR", summary: 'Đăng nhập thất bại', duration: 3000, position: 'topRight' });
            }
          },
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
  }
  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private authSvc: AuthService,
    private router: Router,
  ) { }
}
