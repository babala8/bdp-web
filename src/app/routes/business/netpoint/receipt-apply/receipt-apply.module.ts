import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReceiptApplyComponent } from './receipt-apply.component';
import { ReceiptApplyModal } from './apply/apply.modal';
import { CashAddComponent } from './cash-add/cash-add.modal';
import { AuditComponent } from './audit/audit.modal';
import { DetailComponent } from './detail/detail.component';
import { SplitTaskComponent } from "./split/split-task.component";
import { MergeTaskComponent } from './merge/merge-task.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ReceiptApplyComponent,
    ReceiptApplyModal,
    CashAddComponent,
    AuditComponent,
    SplitTaskComponent,
    MergeTaskComponent,
    DetailComponent
  ],
  entryComponents: [
    ReceiptApplyModal,
    CashAddComponent,
    AuditComponent,
    SplitTaskComponent,
    MergeTaskComponent,
    DetailComponent
  ]
})

export class ReceiptApplyModule {
}
