import { NgModule } from '@angular/core';
import { UserManageComponent } from './user-manage.component';
import { UserAddComponent } from './add/user-add.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserModifyComponent } from './mod/user-modify.component';
import { SharedModule } from '@shared/shared.module';
import { UserAuditComponent } from './audit/user-audit.component';
import { UserResubmitComponent } from './resubmit/user-resubmit.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    UserManageComponent,
    UserAddComponent,
    UserDetailComponent,
    UserModifyComponent,
    UserAuditComponent,
    UserResubmitComponent,
  ],
  entryComponents: [
    UserAddComponent,
    UserDetailComponent,
    UserModifyComponent,
    UserAuditComponent,
    UserResubmitComponent,
  ],
  providers: []
})
export class UserManageModule {}
