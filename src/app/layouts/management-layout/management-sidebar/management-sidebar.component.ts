import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.scss']
})
export class ManagementSidebarComponent implements OnInit, AfterViewInit {
  url = new URL(window.location.href);
  isActive: string = 'dashboard';
  isOpen: boolean = true;
  
  setActive(item: string) {
    this.isActive = item;
  }

  doLogout() {
    this.authSvc.doLogout();
  }

  initSidebar(): void {
    let path = this.url.pathname;
    let parts = path.split("/");
    let secondPart = parts[2];
    this.isActive = secondPart;
    this.isOpen = true;
  }
  ngAfterViewInit(): void {
    this.initSidebar();
  }
  ngOnInit(): void {
    this.initSidebar();
  }

  constructor(
    private authSvc: AuthService,
  ) { }
}
