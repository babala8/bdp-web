import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ServiceManageComponent } from './service-manage.component';
import { DetailComponent } from './detail/detail.component';
import { StatusTransitionComponent } from './status-transition/status-transition.component';
import { BaseInfoAddComponent } from './base-info-add/base-info-add.component';
import { StatusComponent } from './status/status.component';
import { BaseInfoModComponent } from './base-info-mod/base-info-mod.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { DetailModComponent } from "./base-info-mod/detail-mod.component";
import { StatusModComponent } from "./base-info-mod/status-mod.component";

const COMPONENTS = [
  ServiceManageComponent,
];
const ENTRY_COMPONENTS = [
  DetailComponent,
  BaseInfoAddComponent,
  BaseInfoModComponent,
  DetailModComponent,
  StatusModComponent,
  StatusComponent,
  StatusTransitionComponent,
  ProductComponent,
  ProductAddComponent,
];
/**
 * @name 服务管理
 * @export
 * @class ServiceManageModule
 */
@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ...COMPONENTS, ...ENTRY_COMPONENTS
  ],
  providers: [],
  entryComponents: ENTRY_COMPONENTS,
  exports: [
    ServiceManageComponent
  ]
})
export class ServiceManageModule { }
