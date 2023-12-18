import { Component, OnInit } from '@angular/core';
// import { initializeApp, getApp } from '@angular/fire/app';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';
import { initializeApp } from '@angular/fire/app';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  phoneNumber: string = '+84328614013';
  code?: string;
  confirmationResult: any;
  ngOnInit(): void {
    // Initialize your Firebase app
    const app = initializeApp(environment.firebase);
    // Get an instance of Auth
    const auth = getAuth(app);
    // Create a new RecaptchaVerifier instance
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container');
    // Send the OTP
    signInWithPhoneNumber(auth, this.phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.error("Can't send otp");
      });
  }
}
