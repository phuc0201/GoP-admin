import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { MakeForm } from 'src/app/core/model/common/make-form.model';


export interface IUserDTO{
  address: string;
  vehicle: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  password: string;
  birthDate: Date;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  verifyOTP: boolean = false;
  countEnterOTP: number = 0;
  otp: string = '';
  isVisible = false;
  hidePassword: boolean = true;

  form!: FormGroup<MakeForm<IUserDTO>>;

  createForm(): void{
    this.form = this.fb.nonNullable.group({
      address: ['', [Validators.required, Validators.minLength(20)]],
      vehicle: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8),  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]],
      birthDate: [new Date(), [Validators.required]],
    });
  }
  submitForm(): void {
    if (this.form.valid && this.verifyOTP) {
      this.verifyOTP = false;
      this.toast.success({detail:"SUCCESS",summary:'Đăng ký thành công', duration: 3000, position:'topRight'});
      console.log(this.form.value);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onOtpChange(otp: string): void{
    this.otp = otp;
  }

  verifyOTPPhoneNumber(){
    if (this.otp === '111111') {
      this.verifyOTP = true;
    }
    else this.verifyOTP = false;
  }
  showModal(): void {
    if(this.form.controls.phoneNumber.valid){
      this.otp = '';
      this.verifyOTP = false;
      this.isVisible = true;
    }
    else{
      this.toast.warning({detail:"WARN",summary:'Vui lòng nhập số điện thoại', duration: 3000, position:'topRight'});
    }
  }

  handleOk(): void {
    this.verifyOTPPhoneNumber();
    if(this.verifyOTP)
      this.isVisible = false;
    else{
      this.toast.warning({detail:"WARN",summary:'Mã xác thực không chính xác', duration: 3000, position:'topRight'});
    }
  }

  handleCancel(): void {
    this.otp = '';
    this.isVisible = false;
  }
  constructor(
      private fb: FormBuilder,
      private toast: NgToastService,
    ){}
  ngOnInit(): void {
    this.createForm();
  }
}
