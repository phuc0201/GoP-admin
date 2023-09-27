import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarOpen: boolean = true;
  chevronIcon: string = 'chevron_right';
  activeLink: string = '';
  handleSideBar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.chevronIcon = this.isSidebarOpen ? "chevron_left" : "chevron_right";
  }
  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
