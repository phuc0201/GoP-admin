import { Component } from '@angular/core';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.scss']
})
export class ManagementSidebarComponent {
  url = new URL(window.location.href);
  path = this.url.pathname;
  parts = this.path.split("/");
  lastPart = this.parts[this.parts.length - 1];
  isActive: string = this.lastPart;
  isOpen = true;
  setActive(item: string) {
      this.isActive = item;
  }
}
