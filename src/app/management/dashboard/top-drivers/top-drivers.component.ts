import { Component } from '@angular/core';

@Component({
  selector: 'app-top-drivers',
  templateUrl: './top-drivers.component.html',
  styleUrls: ['./top-drivers.component.scss']
})
export class TopDriversComponent {
  topDrivers = [
    {
      UID: '2',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      fullname: 'Trịnh Hoàng Phúc',
      email: 'phuc@gmail.com'
    },
    {
      UID: '3',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      fullname: 'Nguyễn Văn A',
      email: 'a@gmail.com'
    },
    {
      UID: '4',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      fullname: 'Nguyễn Văn B',
      email: 'b@gmail.com'
    }
  ];
}
