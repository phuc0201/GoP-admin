import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { IDriver } from 'src/app/core/model/management/driver.model';
import { OrderStatus } from 'src/app/core/model/management/order-status.model';
import { IOrder, StatisticsCard } from 'src/app/core/model/management/order.model';
import { DriverService } from 'src/app/core/services/management/driver.service';
import { OrderService } from 'src/app/core/services/management/order.service';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent {
  progress: number = 100;
  breadcrumbDisplay: boolean = false;
  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Details',
    listBreadcrumb: [
      {
        title: 'Users',
        link: URLConstant.ROUTE.ADMINISTRATION.USERS,
      },
    ],
  });
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly IOrder[] = [];
  listOfOrders = new Paginate<IOrder>();
  setOfCheckedId = new Set<number>();
  driverID: string = '';
  driverProfile?: IDriver;
  currentPage: number = 1;
  limit: number = 10;
  searchValue: string = "";
  searchOrdersByAddress = {
    src: '',
    des: ''
  };
  searchOption: string = "source_address";
  statistics?: StatisticsCard[];
  isViewProfile: boolean = false;
  onPreviewImg: boolean = false;
  imgPreview?: string = '';

  isVerified: boolean = false;
  goBackURL(): void {
    this.location.back();
  }

  previewImage(image?: string): void {
    this.imgPreview = image;
    this.onPreviewImg = !this.onPreviewImg;
  }
  showModal(): void {
    this.isViewProfile = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isViewProfile = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isViewProfile = false;
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

  onPageChange(index: number) {
    this.progress = 0;
    this.currentPage = index;
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

  loadStatistics(): void {
    this.orderSvc.getStatisticsByDriver(this.driverID).subscribe({
      next: res => {
        if (res.totalEarning) {
          this.statistics = [
            {
              title: SystemConstant.STATISTICS_TITLE.BOOK_TRIPS,
              percent: res.orderPercentageChange,
              totalData: res.totalOrder,
            },
            {
              title: SystemConstant.STATISTICS_TITLE.CANCELLED_TRIPS,
              percent: res.cancelledPercentageChange,
              totalData: res.totalOrderCancelled,
            },
            {
              title: SystemConstant.STATISTICS_TITLE.TOTAL_EARNING,
              percent: res.earningPercentageChange,
              totalData: res.totalEarning,
            },
          ];
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  verifyDriver() {
    this.driverSvc.verifyAccount(this.driverID, !this.isVerified).subscribe({
      next: res => {
        if (res) {
          if (this.isVerified) {
            this.toast.success({ detail: "SUCCESS", summary: 'Khóa tài khoản thành công', duration: 3000, position: 'topRight' });
            this.isVerified = false;
          }
          else {
            this.toast.success({ detail: "SUCCESS", summary: 'Kích hoạt thành công', duration: 3000, position: 'topRight' });
            this.isVerified = true;
          }
        }
      },
      error: err => {
        this.toast.error({ detail: "ERROR", summary: 'Kích hoạt thất bại', duration: 3000, position: 'topRight' });
      },
      complete: () => {
        if (this.driverProfile) {
          this.driverProfile.isVerified = this.isVerified;
        }
      }
    });
  }

  loadOrders() {
    this.spinner.show();
    this.getSearchOption();
    this.progress = 0;
    this.orderSvc.getAllPagingByDriver(this.driverID, this.currentPage, this.limit, this.searchOrdersByAddress.src, this.searchOrdersByAddress.des).subscribe({
      next: res => {
        if (res) {
          this.listOfOrders.data = res.content;
          this.listOfOrders.totalElements = res.totalElements;
          this.listOfOrders.currentPage = res.currentPage;
        }
      },
      complete: () => {
        setTimeout(() => {
          this.spinner.hide();
          this.progress = 100;
        }, 500);
      }
    });
  }

  loadData() {
    this.spinner.show();
    this.progress = 0;
    this.driverSvc.getById(this.driverID).subscribe({
      next: (res) => {
        if (res) {
          this.driverProfile = res;
          this.isVerified = res.isVerified;
        }
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.loadOrders();
        this.loadStatistics();
      }
    });
  }

  ngOnInit(): void {
    this.statistics = [
      {
        title: SystemConstant.STATISTICS_TITLE.BOOK_TRIPS,
        percent: 0,
        totalData: 0,
      },
      {
        title: SystemConstant.STATISTICS_TITLE.CANCELLED_TRIPS,
        percent: 0,
        totalData: 0,
      },
      {
        title: SystemConstant.STATISTICS_TITLE.TOTAL_EARNING,
        percent: 0,
        totalData: 0,
      },
    ];
    this.loadData();
    if (this.router.url.includes(URLConstant.ROUTE.ADMINISTRATION.USERS)) {
      this.breadcrumbDisplay = true;
    }
  }

  constructor(
    private driverSvc: DriverService,
    private orderSvc: OrderService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private toast: NgToastService
  ) {
    this.route.queryParams.subscribe(params => {
      this.driverID = params['id'];
    });
  }
}
