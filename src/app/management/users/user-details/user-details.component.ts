import { Component } from '@angular/core';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Details',
    listBreadcrumb: [
      {
        title: 'Users',
        link: URLConstant.ROUTE.ADMINISTRATION.USERS,
      },
    ],
  });
}
