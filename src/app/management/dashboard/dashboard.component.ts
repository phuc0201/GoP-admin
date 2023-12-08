import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  data = [
    {
      title: 'BOOK TRIPS',
      totalData: 100,
      percent: 10,
    },
    {
      title: 'CANCELLED TRIPS',
      totalData: 200,
      percent: -20,
    },
    {
      title: 'AVAILABLE VEHICLE',
      totalData: 150,
      percent: 10,
    },
    {
      title: 'TOTAL EARNING',
      totalData: 400,
      percent: 20,
    }
  ];
}
