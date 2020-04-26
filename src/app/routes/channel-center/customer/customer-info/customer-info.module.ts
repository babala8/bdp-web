import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import { ChannelCenterService } from '../../channel-center.service';
import { CustomerInfoComponent } from './customer-info.component';
import { CustomerInfoAddComponent } from './add/customer-info-add.component';
import { CustomerInfoDetailComponent } from './detail/customer-info-detail.component';
import { CustomerInfoModifyComponent } from './mod/customer-info-modify.component';
import { CustomerInfoReviseComponent } from './revise/customer-info-revise.component';

/**
 * 客户信息管理模块
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CustomerInfoComponent,
    CustomerInfoAddComponent,
    CustomerInfoDetailComponent,
    CustomerInfoModifyComponent,
    CustomerInfoReviseComponent
  ],
  providers: [
    ChannelCenterService
  ],
  entryComponents: [
    CustomerInfoAddComponent,
    CustomerInfoDetailComponent,
    CustomerInfoModifyComponent,
    CustomerInfoReviseComponent
  ]
})
export class CustomerInfoModule {}
