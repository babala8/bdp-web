import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OrderManageComponent } from './orderManage.component';
import { DistributeLineComponent } from './distributeLine/distributeLine.component';
import { TaskDetailComponent } from './taskDetail/taskDetail.component';
import { BaiduMapModule } from 'angular2-baidu-map';


@NgModule({
  declarations: [
    OrderManageComponent,
    DistributeLineComponent,
    TaskDetailComponent,
  ],
  imports: [
    SharedModule,
    BaiduMapModule
  ],
  exports: [],
  entryComponents: [
    DistributeLineComponent,
    TaskDetailComponent
  ],

})

export class OrderManageModule {

}
