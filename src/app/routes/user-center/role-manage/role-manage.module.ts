import {NgModule} from '@angular/core';
import {RoleManageComponent} from './role-manage.component';
import {SharedModule} from '@shared';
import {RoleAddComponent} from './add/role-add.component';
import {RoleModifyComponent} from './mod/role-modify.component';
import {RoleDetailComponent} from './detail/role-detail.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    RoleManageComponent,
    RoleAddComponent,
    RoleModifyComponent,
    RoleDetailComponent
  ],
  entryComponents: [
    RoleAddComponent,
    RoleModifyComponent,
    RoleDetailComponent
  ],
  providers: []
})
export class RoleManageModule {}
