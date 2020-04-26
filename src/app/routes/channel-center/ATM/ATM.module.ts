import {NgModule} from '@angular/core';
import { DevManageModule } from './dev-manage/dev-manage.module';
import { DevTypeModule } from './dev-type/dev-type.module';
import { DevVendorModule } from './dev-vendor/dev-vendor.module';
import { RouterModule, Routes } from '@angular/router';
import { DevManageComponent } from './dev-manage/dev-manage.component';
import { DevTypeComponent } from './dev-type/dev-type.component';
import { DevVendorComponent } from './dev-vendor/dev-vendor.component';

const route: Routes = [

  {
    path: 'dev-manage',
    component: DevManageComponent,
    data: { title: '设备信息管理' },
  },
  {
    path: 'dev-type',
    component: DevTypeComponent,
    data: { title: '设备类型管理' },
  },
  {
    path: 'dev-vendor',
    component: DevVendorComponent,
    data: { title: '设备品牌管理' },
  }

];
@NgModule({
  imports: [
    DevManageModule,
    DevTypeModule,
    DevVendorModule,
    RouterModule.forChild(route),

  ],
  declarations: [],
  providers: [],
  entryComponents: [],
})

export class ATMModule {

}
