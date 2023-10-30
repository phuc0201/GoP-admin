import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BreadcrumbComponent } from 'src/app/shared/widget/breadcrumb/breadcrumb.component';
@NgModule({
  declarations: [
    ListUsersComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzTableModule,
    NzTagModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    BreadcrumbComponent
  ]
})
export class UsersModule { }
