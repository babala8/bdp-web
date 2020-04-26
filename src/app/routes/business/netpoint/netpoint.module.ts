import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AllocationApplyModule } from './allocation-apply/allocation-apply.module';
import { AllocationManageModule } from './allocation-manage/allocation-manage.module';
import { ReceiptApplyModule } from './receipt-apply/receipt-apply.module';
import { ReceiptManageModule } from './receipt-manage/receipt-manage.module';
import { RouterModule, Routes } from '@angular/router';
import { AllocationApplyComponent } from './allocation-apply/allocation-apply.component';
import { AllocationManageComponent } from './allocation-manage/allocation-manage.component';
import { OutManageComponent } from './out-manage/out-manage.component';
import { ReceiptApplyComponent } from './receipt-apply/receipt-apply.component';
import { ReceiptManageComponent } from './receipt-manage/receipt-manage.component';
import {OutManageModule} from "./out-manage/out-manage.module";

const route: Routes = [
  {path: 'allocation-apply', component: AllocationApplyComponent, data: {title: '网点寄库&解现申请'}},
  {path: 'allocation-manage', component: AllocationManageComponent, data: {title: '网点寄库解现任务'}},
  {path: 'out-manage', component: OutManageComponent, data: {title: '网点寄库领回任务'}},
  {path: 'receipt-apply', component: ReceiptApplyComponent, data: {title: '网点领现申请'}},
  {path: 'receipt-manage', component: ReceiptManageComponent, data: {title: '网点领现任务'}},
];

@NgModule({
  imports: [
    SharedModule,
    AllocationApplyModule,
    AllocationManageModule,
    ReceiptApplyModule,
    ReceiptManageModule,
    OutManageModule,
    RouterModule.forChild(route)
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class NetpointModule {
}
