import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { ServiceManageComponent } from './service-manage/service-manage.component';
import { ServiceManageModule } from './service-manage/service-manage.module';
import { SkuManageComponent } from './sku-manage/sku-manage.component';
import { SkuManageModule } from './sku-manage/sku-manage.module';
import { ServiceCenterService } from './service-center.service';

const route: Routes = [
  {
    path: 'service-manage',
    component: ServiceManageComponent,
    data: { title: '服务管理' },
  },
  {
    path: 'sku-manage',
    component: SkuManageComponent,
    data: { title: '产品管理' },
  }
];

/**
 * @name 服务中心 
 * @export
 * @class ServiceCenterModule
 */
@NgModule({
  imports: [
    SharedModule,
    SkuManageModule,
    ServiceManageModule,
    RouterModule.forChild(route),
  ],
  providers: [ServiceCenterService]
})
export class ServiceCenterModule {

}
