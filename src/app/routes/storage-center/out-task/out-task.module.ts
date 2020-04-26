import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AuditComponent } from './audit/audit.component';
import { OutDetailComponent } from './out-detail/out-detail.component';
import { SelectCashboxComponent } from './select-cashbox/select-cashbox.component';
import { OutTaskComponent } from "./out-task.component";
import {CashAddComponent} from "./cash-add/cash-add.modal";

/** 出库任务管理模块 */
@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    OutTaskComponent,
    SelectCashboxComponent,
    AuditComponent,
    OutDetailComponent,
    CashAddComponent,
  ],
  entryComponents: [
    SelectCashboxComponent,
    AuditComponent,
    OutDetailComponent,
    CashAddComponent
]
})
export class OutTaskModule {

}
