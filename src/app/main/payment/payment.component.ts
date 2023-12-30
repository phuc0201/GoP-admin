import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/core/services/common/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  amount: number = 0;
  paymentSuccess: boolean = false;
  paymentError: boolean = false;
  getPayment(): void {
    this.paymentSvc.getPayment(this.amount).subscribe({
      next: res => {
        if (res) {
          window.location.href = res.url;
        }
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private route: ActivatedRoute,
    private paymentSvc: PaymentService,
    // private
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['amount']) {
        this.amount = Number(params['amount']);
      }
      if (params['vnp_Amount']) {
        this.amount = Math.ceil(Number(params['vnp_Amount']) / 100);
        if (params['vnp_ResponseCode'] == '00') {
          this.paymentSuccess = true;
        }
        else this.paymentError = true;
      }
    });
  }
}
