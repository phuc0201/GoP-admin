import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
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
export class ListJourneysComponent implements OnInit, OnChanges {
  progress: number = 0;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly IOrder[] = [];
  listOfOrders = new Paginate<IOrder>();
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

  deleteOrder(order: IOrder) {
    if (order.orderStatus === OrderStatus.CANCELLED) {
      this.toast.warning({ detail: "WARNING", summary: 'order canceled', duration: 2000, position: 'topRight' });
    }
    else if (order.orderStatus === OrderStatus.PENDING) {
      this.orderSvc.deleteOrder(order.id).subscribe({
        complete: () => {
          // let index = this.listOfOrders.data.indexOf(order);
          // if (index > -1) {
          //   let listOrders = [...this.listOfOrders.data.slice(0, index), ...this.listOfOrders.data.slice(index + 1)];
          //   this.listOfOrders.data = listOrders;
          //   if (this.listOfOrders.data.length == 0) {
          //     this.listOfOrders.totalElements = this.listOfOrders.totalElements - 1;
          //     this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : this.currentPage + 1;
          //     this.loadOrders();
          //   }
          // };
          let index = this.listOfOrders.data.indexOf(order);
          this.listOfOrders.data[index].orderStatus = OrderStatus.CANCELLED;
          this.toast.success({ detail: "SUCCESS", summary: 'Cancel trip successful', duration: 2000, position: 'topRight' });
        },
        error: err => {
          this.toast.error({ detail: "ERROR", summary: 'Delete failed', duration: 2000, position: 'topRight' });
        }
      });
    }
    else {
      this.toast.warning({ detail: "WARNING", summary: 'Can not cancel order', duration: 2000, position: 'topRight' });
    }
  }

  deleteListOrders() {
    let listOrders: number[] = [];
    this.setOfCheckedId.forEach(id => {
      this.listOfOrders.data.forEach(order => {
        if (order.id === id && order.orderStatus === OrderStatus.PENDING) {
          listOrders.push(id);
        }
      });
    });
    if (listOrders.length === 0) {
      this.toast.warning({ detail: "WARNING", summary: 'Please select pending orders', duration: 2000, position: 'topRight' });
    }
    else {
      this.orderSvc.deleteListOrder(listOrders).subscribe({
        next: res => {
          this.listOfOrders.data.forEach(order => {
            if (listOrders.includes(order.id)) {
              order.orderStatus = OrderStatus.CANCELLED;
            }
          });
          this.checked = false;
          this.onAllChecked(false);
        },
        error: err => {
          this.toast.error({ detail: "ERROR", summary: 'Delete failed', duration: 2000, position: 'topRight' });
        },
        complete: () => {
          this.toast.success({ detail: "SUCCESS", summary: 'Cancel trip successful', duration: 2000, position: 'topRight' });
        }
      });
    }
  }
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
          this.listOfOrders.data = res.content;
          this.listOfOrders.totalElements = res.totalElements;
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('sssfdsd');

  }

  constructor(
    private orderSvc: OrderService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService) { }
}
