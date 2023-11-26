import { Component } from '@angular/core';

@Component({
  selector: 'app-journey-details',
  templateUrl: './journey-details.component.html',
  styleUrls: ['./journey-details.component.scss']
})
export class JourneyDetailsComponent {


  dataUsers = [
    {
      name: 'Phuc',
      phone: '0987654321',
      avatar: 'assets/img/avt.jpg',
      role: 'driver'
    },
    {
      name: 'Phuoc',
      phone: '0987654321',
      avatar: 'assets/img/avt.jpg',
      role: 'customer'
    }
  ]
  makeCall(phoneNumber: string) {

  }

  constructor() {
  }
}
