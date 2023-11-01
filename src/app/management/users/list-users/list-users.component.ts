import { Component, OnInit } from '@angular/core';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';
interface ItemData {
  id: string;
  avatar: string;
  name: string;
  email: string,
  age: number;
  address: string;
  role: string;
  ban: boolean;
  active: boolean;
}
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit{
  listHeadTable = ['Avatar' ,'Name', 'Email', 'Age', 'Address', 'Role', 'Action'];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<string>();

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Users',
    listBreadcrumb: [],
  });
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  onPageChange(index: number) {
    console.log('Chuyển đến trang', index);
  }
  ngOnInit(): void {
    this.listOfData = new Array(5).fill(0).map((_, index) => ({
      id: index.toString(),
      name: `Edward King ${index}`,
      avatar:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      email:'phuc@gmail.com',
      age: 32,
      address: `London, Park Lane no. ${index}`,
      role: index % 2 == 0 ? 'customer' : 'driver',
      ban: index % 2 == 0 ? true : false,
      active: index % 2 == 0 ? true : false
    }));
  }
}
