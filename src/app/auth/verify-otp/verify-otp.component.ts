import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgOtpInputComponent } from 'ng-otp-input';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit, OnChanges {
  @ViewChild('otpInput') otpInput!: NgOtpInputComponent;
  @Input() isVisible: boolean = false;
  @Input() phoneNumber: string = '';
  @Output() showModal = new EventEmitter<boolean>();
  @Output() phoneVerified = new EventEmitter<boolean>();
  @Output() sendOTP = new EventEmitter<boolean>();
  otp: string = '';
  timeOut: number = 60;
  resetOTP: boolean = false;
  isVerifing: boolean = false;
  resetOtpInput() {
    this.resetOTP = true;
    this.sendOTP.emit(true);
    setTimeout(() => {
      this.otpInput.setValue('');
      this.resetOTP = false;
      this.timeOut = 60;
    }, 1000);
  }

  verifyOTP(): void {
    this.isVerifing = true;
    let phone = '+84' + this.phoneNumber.slice(1, 10);
    try {
      this.authSvc.verifyOTP(phone, this.otp).subscribe({
        next: (res: any) => {
          if (res['error'] == false) {
            setTimeout(() => {
              this.isVerifing = false;
              this.isVisible = false;
              this.showModal.emit(this.isVisible);
              this.phoneVerified.emit(true);
              this.toast.success({ detail: "SUCCESS", summary: 'Xác thực thành công', duration: 3000, position: 'topRight' });
            }, 1000);
          }
        },
        error: () => {
          setTimeout(() => {
            this.isVerifing = false;
            this.otpInput.setValue('');
            this.toast.warning({ detail: "WARNING", summary: 'Xác thực otp thất bại', duration: 3000, position: 'topRight' });
          }, 1000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.showModal.emit(this.isVisible);
  }

  onOtpChange(otp: string): void {
    this.otp = otp;
  }

  countDown(): void {
    this.timeOut = 60;
    setInterval(() => {
      if (this.timeOut > 0)
        this.timeOut = this.timeOut - 1;
    }, 1000);
  }

  ngOnInit(): void {
    this.countDown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.timeOut = 60;
  }

  constructor(
    private toast: NgToastService,
    private authSvc: AuthService
  ) { }
}
