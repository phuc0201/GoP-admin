import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { IOrder } from 'src/app/core/model/management/order.model';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Details',
    listBreadcrumb: [
      {
        title: 'Users',
        link: URLConstant.ROUTE.ADMINISTRATION.USERS,
      },
    ],
  });
  listHeadTable = ['Date', 'DriverID', 'SourceAddress', 'DestinyAddress', 'Fare', 'Action'];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly IOrder[] = [];
  listOfData: readonly IOrder[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly IOrder[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.listOfData = new Array(5).fill(0).map((_, index) => ({
      id: index,
      date: '28/10/2023',
      customer_id: '1adasdasdasda',
      driver_id: 'awdsdsdcdvdbdfvdf',
      source_lat: 1,
      source_long: 1,
      destiny_lat: 1,
      destiny_long: 1,
      source_address: 'Tp Hồ Chí Minh',
      destiny_address: 'Tp Cần Thơ',
      fare: 1000,
    }));
  }
}
