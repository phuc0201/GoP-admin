import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { DriverService } from 'src/app/core/services/management/driver.service';
import { UserService } from 'src/app/core/services/management/user.service';
import { BreadCrumb } from 'src/app/shared/widget/breadcrumb/breadcrumb.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

export interface IOption{
  role: string;
  currPage: number;
}
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit{
  listHeadTable = ['Avatar' ,'Name', 'Phone', 'Address', 'Role'];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly any[] = [];
  listUser = new Paginate<any>();
  setOfCheckedId = new Set<string>();
  pageSize = 10;
  currentPsge: number = 1;
  selectedRole: string='Customer';
  progress: number = 0;

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Users',
    listBreadcrumb: [],
  });
  listRole:string[] = [
    'Customer',
    'Driver'
  ];

  saveOption(){
    localStorage.setItem('OPTION-USERMANAGEMENT',JSON.stringify({
      role: this.selectedRole,
      currPage: this.currentPsge
    }));
  }

  getOption(): IOption | null{
    const option = localStorage.getItem('OPTION-USERMANAGEMENT');
    if(option){
      return JSON.parse(option);
    }
    return null;
  }

  onRoleChange(value: string): void {
    this.progress = 0;
    this.selectedRole = value;
    this.saveOption();
    this.getDataPaging(this.currentPsge, this.pageSize, '',  '');
  }

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

  onCurrentPageDataChange($event: readonly any[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  onPageChange(index: number) {
    this.progress = 0;
    this.currentPsge = index;
    this.saveOption();
    this.getDataPaging(index, this.pageSize, '', '')
  }

  getDataPaging(
    currentPage: number,
    pageSize: number,
    fullname?: string,
    phone?: string): void {
      this.spinner.show();
      try {
        if(this.selectedRole === 'Customer'){
          this.userSvc.getAllPaging(currentPage, pageSize, fullname, phone)
          .subscribe({
            next: res => {
              if(res){
                setTimeout(() => {
                  this.listUser.data = res.content;
                  this.listUser.totalElements = res.totalElements;
                  this.listUser.currentPage = res.currentPage;
                  this.spinner.hide();
                  this.progress = 100;
                }, 500);
              }
            }
          });
        }
        else if(this.selectedRole === 'Driver'){
          this.driverSvc.getAllPaging(currentPage, pageSize, fullname, phone)
          .subscribe({
            next: res => {
              if(res){
                setTimeout(() => {
                  this.listUser.data = res.content;
                  this.listUser.totalElements = res.totalElements;
                  this.listUser.currentPage = res.currentPage;
                  this.spinner.hide();
                  this.progress = 100;
                }, 500);
              }
            }
          })
        }
      } catch (error) {
        this.spinner.hide();
        this.toast.error({ detail: "ERROR", summary: 'Load data failed', duration: 3000, position: 'topRight' });
      }

  }

  creatListUserTestAPI(startIndex: number){
    this.spinner.show()
    setTimeout(()=>{
      this.listUser.data = []
      this.listUser.totalElements = 100;
      for(let i  = startIndex; i<= startIndex + 10; i++){
        this.listUser.data.push({
          id:"653947fd5c9d03f872b3d4d9",
          fullname:"Nguyễn Bá Phước" + i,
          location:[],
          refreshToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTM5NDdmZDVjOWQwM2Y4NzJiM2Q0ZDkiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDU0Nzg4NiwiZXhwIjoxNzAxMTUyNjg2fQ.-GYzWOWWox7-9JUYvZtZRb4CQIRIftYBHKDCQ8oRBD8",
          avatar: "https://gopstorage0.blob.core.windows.net/image/653947fd5c9d03f872b3d4d9.jpg",
          phone:"+84333495017",
          createdAt:"2023-10-25T16:53:17.543Z",
          updatedAt:"2023-11-21T06:24:46.630Z"
        })
      }
      this.spinner.hide();
    }, 5000)
  }

  ngOnInit(): void {
    let option = this.getOption();
    if(option?.currPage!==undefined)
      this.currentPsge = option.currPage;
    if(option?.role!==undefined)
      this.selectedRole = option.role;
    this.getDataPaging(this.currentPsge, this.pageSize, '', '')
    // this.creatListUserTestAPI(0)
  }
  constructor(
    private userSvc: UserService,
    private driverSvc: DriverService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
  ){}
}
