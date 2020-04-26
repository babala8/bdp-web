import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
import { UserManageComponent } from './user-manage/user-manage.component';
import { RoleManageComponent } from './role-manage/role-manage.component';
import { UserLogComponent } from './user-log/user-log.component';
import { OrgManageComponent } from './org-manage/org-manage.component';
import { OrgManageModule } from './org-manage/org-manage.module';
import { RoleManageModule } from './role-manage/role-manage.module';
import { UserLogModule } from './user-log/user-log.module';
import { UserManageModule } from './user-manage/user-manage.module';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { MenuManageModule } from './menu-manage/menu-manage.module';
import { MessageDetailModule} from './message-manage/message-detail.module';
import { MessageDetail } from './message-manage/message-detail';

const routes: Routes = [
  {path: 'org-manage', component: OrgManageComponent, data: {title: '机构管理'}},
  {path: 'role-manage', component: RoleManageComponent, data: {title: '角色管理'}},
  {path: 'user-log', component: UserLogComponent, data: {title: '用户日志管理'}},
  {path: 'user-manage', component: UserManageComponent, data: {title: '用户管理'}},
  {path: 'menu-manage', component: MenuManageComponent, data: {title: '菜单管理'}},
  {path: 'message-detail', component: MessageDetail, data: {title: '消息查询'}},

];

@NgModule({
  imports: [
    MessageDetailModule,
    MenuManageModule,
    SharedModule,
    OrgManageModule,
    RoleManageModule,
    UserLogModule,
    UserManageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  ],
  providers: [],
  exports: []
})
export class UserCenterModule {

}
