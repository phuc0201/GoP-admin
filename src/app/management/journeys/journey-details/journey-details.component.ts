import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { IOrder } from 'src/app/core/model/management/order.model';
import { OrderService } from 'src/app/core/services/management/order.service';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';
@Component({
  selector: 'app-journey-details',
  templateUrl: './journey-details.component.html',
  styleUrls: ['./journey-details.component.scss']
})
export class JourneyDetailsComponent implements OnInit, AfterViewInit {
  progress: number = 0;
  tripID: string = '';
  order?: IOrder;
  time?: string;
  distance?: string;
  breadcrumbDisplay: boolean = false;
  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Trip details',
    listBreadcrumb: [
      {
        title: 'Trip',
        link: URLConstant.ROUTE.ADMINISTRATION.JOURNEYS,
      },
    ],
  });

  goBackURL(): void {
    this.location.back();
  }

  setTime(time: number): void {
    if (time >= 60) {
      time = time / 60;
      this.time = Math.ceil(time).toString() + ' h';
    }
    else this.time = Math.ceil(time).toString() + ' m';
  }

  setDistance(distance: number): void {
    if (distance > 1000) {
      this.distance = (distance / 1000).toFixed(2) + ' km';
    }
    else this.distance = distance.toFixed(2) + ' m';
  }

  loadData(): void {
    this.progress = 0;
    this.orderSvc.getById(this.tripID).subscribe({
      next: res => {
        if (res) {
          this.order = res;
        }
      },
      complete: () => {
        this.progress = 100;
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
    if (this.router.url.includes(URLConstant.ROUTE.ADMINISTRATION.JOURNEYS)) {
      this.breadcrumbDisplay = true;
    }
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  constructor(
    private orderSvc: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    this.route.queryParams.subscribe(params => {
      this.tripID = params['id'];
    });
  }
}
