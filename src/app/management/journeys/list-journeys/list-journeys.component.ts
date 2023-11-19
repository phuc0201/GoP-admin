import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/model/management/order.model';

@Component({
  selector: 'app-list-journeys',
  templateUrl: './list-journeys.component.html',
  styleUrls: ['./list-journeys.component.scss']
})
export class ListJourneysComponent implements OnInit {
  listHeadTable = ['Date', 'CusID', 'DriverID', 'SourceAddress', 'DestinyAddress', 'Fare', 'Action'];
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
    this.listOfData = new Array(200).fill(0).map((_, index) => ({
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
