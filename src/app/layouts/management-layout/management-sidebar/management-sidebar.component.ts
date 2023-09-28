import { Component } from '@angular/core';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.scss']
})
export class ManagementSidebarComponent {
  isActive: string = 'dashboard';
  setActive(item: string) {
      this.isActive = item;
      
  }
}
