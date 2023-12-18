import { Component, OnInit } from '@angular/core';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { IDriver } from 'src/app/core/model/management/driver.model';
import { IOrder, IOrderByTime, IStatistics, StatisticsCard } from 'src/app/core/model/management/order.model';
import { OrderService } from 'src/app/core/services/management/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data = [
    {
      title: 'BOOK TRIPS',
      totalData: 100,
      percent: 10,
    },
    {
      title: 'CANCELLED TRIPS',
      totalData: 200,
      percent: -20,
    },
    {
      title: 'TOTAL EARNING',
      totalData: 400,
      percent: 20,
    }
  ];
  statisticsCard?: StatisticsCard[] = this.data;
  statisticsData?: IStatistics;
  topDrivers?: IDriver[];
  ordersInProgress?: IOrder[];
  progress: number = 0;
  orderByTime?: IOrderByTime[];
  loadTopDriver() {
    this.orderSvc.getTopDriverBasedOnTotalOrderValue().subscribe({
      next: res => {
        if (res) {
          this.topDrivers = res;
        }
      },
      error: err => {
        // console.log(err);
      }
    });
  }

  loadStatisticsOrders() {
    this.progress = 0;
    this.orderSvc.getStatisticsByAdmin().subscribe({
      next: res => {
        if (res) {
          this.statisticsData = res;
          this.statisticsCard = [
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
      complete: () => {
        this.progress = 100;
      }
    });
  }

  loadOrdersInProgress() {
    this.orderSvc.getOrdersLocation().subscribe({
      next: res => {
        if (res) {
          this.ordersInProgress = res;
        }
      },
      error: err => {
        // console.log(err);
      }
    });
  }

  loadOrderByTime() {
    this.orderSvc.getOrderByTime(12, 2023).subscribe({
      next: res => {
        this.orderByTime = res;
      },
      error: err => {
        // console.log(err);
      }
    });
  }
  ngOnInit(): void {
    this.loadStatisticsOrders();
    this.loadTopDriver();
    this.loadOrdersInProgress();
    this.loadOrderByTime();
  }
  constructor(
    private orderSvc: OrderService,
  ) { }
}
