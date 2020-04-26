import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AllocationApplyComponent } from './allocation-apply.component';
import { ApplyModalComponent } from './apply/apply.modal.component';
import { CashboxAddComponent } from './apply/cashbox-add/cashbox-add.modal';
import { AuditComponent } from './audit/audit.modal';
import { CashAddComponent } from './apply/cash-add/cash-add.modal';
import { ModifyComponent } from './modify/modify.modal';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AllocationApplyComponent,
    ApplyModalComponent,
    CashboxAddComponent,
    CashAddComponent,
    AuditComponent,
    ModifyComponent,
    DetailComponent
  ],
  entryComponents: [
    ApplyModalComponent,
    CashboxAddComponent,
    CashAddComponent,
    AuditComponent,
    ModifyComponent,
    DetailComponent
  ]
})

export class AllocationApplyModule {
}
