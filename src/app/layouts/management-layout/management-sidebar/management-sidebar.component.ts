import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.scss']
})
export class ManagementSidebarComponent {
  url = new URL(window.location.href);
  path = this.url.pathname;
  parts = this.path.split("/");
  secondPart = this.parts[2];
  isActive: string = this.secondPart;
  isOpen = true;
  setActive(item: string) {
      this.isActive = item;
  }
  doLogout() {
    this.authSvc.doLogout();
  }
  constructor(
    private authSvc: AuthService,
  ){}
}
