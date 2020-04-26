import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OrgAddComponent } from './add/org-add.component';
import { OrgDetailComponent } from './detail/org-detail.component';
import { OrgManageComponent } from './org-manage.component';
import { OrgModifyComponent } from './mod/org-modify.component';
import { OrgReviseComponent } from './revise/org-revise.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    OrgManageComponent,
    OrgAddComponent,
    OrgModifyComponent,
    OrgDetailComponent,
    OrgReviseComponent,
  ],
  entryComponents: [
    OrgAddComponent,
    OrgModifyComponent,
    OrgDetailComponent,
    OrgReviseComponent,
  ],
  providers: [],
})
export class OrgManageModule {

}
