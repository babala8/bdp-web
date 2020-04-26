/* 异常订单处理模块
* 处理异常订单
* zhf
* */
import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { AbnormalTaskComponent } from './abnormal-task.component';
import { OperateCompoment } from './operate/operate.compoment';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AbnormalTaskComponent,
      }
    ])
  ],
  declarations: [
    AbnormalTaskComponent,
    OperateCompoment,
  ],
  entryComponents: [
    OperateCompoment
  ]
})
export class AbnormalTaskModule {
  
}
