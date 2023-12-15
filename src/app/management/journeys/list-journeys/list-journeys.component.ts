import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListOrderStatus, OrderStatus } from 'src/app/core/model/management/order-status.model';
import { IOrder } from 'src/app/core/model/management/order.model';
import { OrderService } from 'src/app/core/services/management/order.service';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-journeys',
  templateUrl: './list-journeys.component.html',
  styleUrls: ['./list-journeys.component.scss']
})
export class ListJourneysComponent implements OnInit {
  progress: number = 0;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly IOrder[] = [];
  listOfOrdes = new Paginate<IOrder>();
  setOfCheckedId = new Set<number>();
  currentPage: number = 1;
  listOrderStatus = ListOrderStatus;
  orderStatusOption: string = 'ALL';
  searchOption: string = "source_address";
  showModal: boolean = false;
  searchOrdersByAddress = {
    src: '',
    des: ''
  };
  searchValue: string = '';
  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Trips',
    listBreadcrumb: [],
  });
  addNewOrder(): void {
    this.showModal = true;
  }
  closeModal(closed: boolean): void {
    this.showModal = false;
  }
  searchOrders(): void {
    this.currentPage = 1;
    this.loadOrders();
  }
  getSearchOption(): void {
    this.searchOrdersByAddress = {
      src: '',
      des: ''
    };
    if (this.searchOption === 'source_address')
      this.searchOrdersByAddress.src = this.searchValue;
    else this.searchOrdersByAddress.des = this.searchValue;
  }

  onOrderStatusChange(status: string): void {
    this.progress = 0;
    this.currentPage = 1;
    this.loadOrders();
  }

  onPageChange(index: number): void {
    this.progress = 0;
    this.currentPage = index;
    this.loadOrders();
  }

  getTagColor(status: string): string {
    return status === OrderStatus.COMPLETED ? 'green' :
      status === OrderStatus.CANCELLED ? 'red' :
        status === OrderStatus.CONFIRM ? 'blue' :
          status === OrderStatus.INPROGRESS ? 'magenta' : 'orange';
  }

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

  loadOrders() {
    this.spinner.show();
    this.getSearchOption();
    this.progress = 0;
    this.orderSvc.getAllPaging(this.currentPage, 10, this.orderStatusOption, this.searchOrdersByAddress.src, this.searchOrdersByAddress.des).subscribe({
      next: res => {
        if (res) {
          this.listOfOrdes.data = res.content;
          this.listOfOrdes.totalElements = res.totalElements;
        }
      },
      complete: () => {
        this.progress = 100;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    });
  }
  ngOnInit(): void {
    this.loadOrders();
  }
  constructor(
    private orderSvc: OrderService,
    private spinner: NgxSpinnerService) { }
}
