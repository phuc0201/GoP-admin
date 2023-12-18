import { Component, OnInit } from '@angular/core';

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

  }
}
