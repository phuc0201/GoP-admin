import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { OrderStatus } from 'src/app/core/model/management/order-status.model';
import { IOrder, StatisticsCard } from 'src/app/core/model/management/order.model';
import { IUser } from 'src/app/core/model/management/user.model';
import { OrderService } from 'src/app/core/services/management/order.service';
import { UserService } from 'src/app/core/services/management/user.service';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Details',
    listBreadcrumb: [
      {
        title: 'Users',
        link: URLConstant.ROUTE.ADMINISTRATION.USERS,
      },
    ],
  });
  listHeadTable = ['Driver', 'Phone', 'Source Address', 'Destiny Address', 'Fare'];
  progress = 0;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly IOrder[] = [];
  listOfOrders = new Paginate<IOrder>();
  setOfCheckedId = new Set<number>();
  userID: string = '';
  userProfile?: IUser;
  currentPage: number = 1;
  limit: number = 10;
  searchValue: string = "";
  searchOrdersByAddress = {
    src: '',
    des: ''
  };
  searchOption: string = "source_address";
  statistics?: StatisticsCard[];

  getTagColor(status: string): string {
    return status === OrderStatus.COMPLETED ? 'green' :
      status === OrderStatus.CANCELLED ? 'red' :
        status === OrderStatus.DRIVERISARRIVING ? 'blue' :
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
    this.orderSvc.getStatisticsByUser(this.userID).subscribe({
      next: res => {
        if (res) {
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

  loadOrders() {
    this.spinner.show();
    this.getSearchOption();
    this.progress = 0;
    this.orderSvc.getAllPagingByUser(this.userID, this.currentPage, this.limit, this.searchOrdersByAddress.src, this.searchOrdersByAddress.des).subscribe({
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
        }, 1500);
      }
    });
  }
  loadData() {
    this.spinner.show();
    this.progress = 0;
    this.userSvc.getById(this.userID).subscribe({
      next: (res) => {
        if (res) {
          this.userProfile = res;
        }
      },
      complete: () => {
        this.loadOrders();
        this.loadStatistics();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
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
  }

  constructor(
    private userSvc: UserService,
    private orderSvc: OrderService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.userID = params['id'];
    });
  }
}
