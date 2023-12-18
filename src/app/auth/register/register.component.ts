import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MakeForm } from 'src/app/core/model/common/make-form.model';
import { IDriverDTO } from 'src/app/core/model/management/driver.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  progress: number = 100;
  verifyOTP: boolean = false;
  countEnterOTP: number = 0;
  otp: string = '';
  showModalOTP: boolean = false;
  hidePassword: boolean = true;
  phoneValidateStatus: string = '';
  isSendOTP: boolean = false;
  newDriver!: IDriverDTO;

  form!: FormGroup<MakeForm<IDriverDTO>>;

  createForm(): void {
    this.form = this.fb.nonNullable.group({
      fullname: ['', [Validators.required]],
      vehicle: ['bike', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]],
    });
  }
  closeModal(closed: boolean): void {
    this.showModalOTP = closed;
    this.isSendOTP = closed;
  }

  showModal(): void {
    if (this.form.controls.phone.valid) {
      this.isSendOTP = true;
      // this.sendOTP();
    }
    else {
      this.toast.warning({ detail: "WARNING", summary: 'Vui lòng nhập số điện thoại', duration: 1500, position: 'topRight' });
    }
  }
  verifyPhone(isVerified: boolean): void {
    if (isVerified) {
      this.verifyOTP = true;
      this.phoneValidateStatus = 'success';
    }
    else this.phoneValidateStatus = '';
  }

  sendOTP(reSend?: boolean) {
    try {
      if (this.form.controls.phone.valid) {
        let phone = '+84' + this.form.controls.phone.value.slice(1, 10);
        this.authSvc.sendOTP(phone).subscribe({
          next: (res: any) => {
            if (res['to'] === phone) {
              this.showModalOTP = true;
              this.toast.success({ detail: "SUCCESS", summary: 'OTP đã được', duration: 2000, position: 'topRight' });
            }
            else {
              this.isSendOTP = false;
              this.toast.error({ detail: "ERROR", summary: 'Gửi OTP thất bại', duration: 2000, position: 'topRight' });
            }
          },
          error: () => {
            this.toast.error({ detail: "ERROR", summary: 'Gửi OTP thất bại', duration: 2000, position: 'topRight' });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  submitForm(): void {
    // if (!this.verifyOTP) {
    //   this.toast.warning({ detail: "WARNING", summary: 'Vui lòng xác thực OTP', duration: 3000, position: 'topRight' });
    // }
    if (this.form.valid) {
      this.progress = 0;
      this.newDriver = {
        fullname: this.form.controls.fullname.value,
        phone: '+84' + this.form.controls.phone.value.slice(1, 10),
        vehicle: this.form.controls.vehicle.value,
        password: this.form.controls.password.value
      };
      this.authSvc.createDriver(this.newDriver).subscribe({
        next: res => {
          if (res) {
            setTimeout(() => {
              this.toast.success({ detail: "SUCCESS", summary: 'Đăng ký thành công', duration: 3000, position: 'topRight' });
              this.progress = 100;
              this.router.navigateByUrl('/auth/driver/login');
            }, 1000);
          }
        },
        error: err => {
          this.toast.error({ detail: "ERROR", summary: 'Đăng ký thất bại', duration: 3000, position: 'topRight' });
        }
      });
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    private authSvc: AuthService,
  ) { }
  ngOnInit(): void {
    this.authSvc.doLogout();
    this.createForm();
  }
}
