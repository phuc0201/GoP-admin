import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUser } from 'src/app/core/model/management/user.model';
import { UserService } from 'src/app/core/services/management/user.service';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit{
  listHeadTable = ['Avatar' ,'Name', 'Phone', 'Address', 'Action'];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly IUser[] = [];
  listOfData = new Paginate<IUser>();
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

  onCurrentPageDataChange($event: readonly IUser[]): void {
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
  getDataPaging(isSearch?: boolean): void {
    this.userSvc.getAllPaging(1, 10)
    .subscribe({
      next: res => {
        if(res){
          this.listOfData.data = res.content
          console.log(res.content)
        }
        else {
          this.toast.error({ detail: "ERROR", summary: 'Đăng nhập thất bại', duration: 3000, position: 'topRight' });
        }
      }
    })
  }
  ngOnInit(): void {
    this.getDataPaging();
  }
  constructor(
    private userSvc: UserService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
  ){}
}
