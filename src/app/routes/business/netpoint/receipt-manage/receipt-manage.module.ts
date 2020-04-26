import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReceiptManageComponent } from './receipt-manage.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ReceiptManageComponent,
    ProgressComponent
  ],
  entryComponents: [
    ProgressComponent
  ]
})

export class ReceiptManageModule {
}
