import {NgModule } from '@angular/core';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTypeComponent } from './customer-type/customer-type.component';
import {CustomerInfoModule} from "./customer-info/customer-info.module";
import {CustomerTypeModule} from "./customer-type/customer-type.module";

const route: Routes = [
  {
    path: 'customer-info',
    component: CustomerInfoComponent,
    data: {title: '客户信息管理'},
  },
  {
    path: 'customer-type',
    component: CustomerTypeComponent,
    data: {title: '客户类型管理'},
  }
];

@NgModule({
  imports: [
    CustomerInfoModule,
    CustomerTypeModule,
    RouterModule.forChild(route)
  ],
  declarations: [],
  providers: [],
  entryComponents: [],
})
export class CustomerModule {

}
