import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevCompanyComponent } from './dev-company.component';
import {SharedModule} from "@shared";
import {DevCompanyAddComponent} from './add/devCompany-add.component';
import {DevCompanyDetailComponent} from './detail/devCompany-detail.component';
import {DevCompanyModifyComponent} from './mod/devCompany-modify.component';

/**
 * 设备维护商模块
 */
@NgModule({
  declarations: [
    DevCompanyComponent,
    DevCompanyAddComponent,
    DevCompanyDetailComponent,
    DevCompanyModifyComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents : [
    DevCompanyAddComponent,
    DevCompanyModifyComponent,
    DevCompanyDetailComponent
  ],
  providers: [

  ],
})
export class DevCompanyModule {
  constructor() {

  }
}
