import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ATMAllocationQueryComponent } from './ATM-allocation-query.component';
import { ATMAllocationQueryDetailComponent } from './detail/ATM-allocation-query-detail.component';

/**
 * ATM配钞信息查询
 */
@NgModule({
  declarations: [
    ATMAllocationQueryComponent,
    ATMAllocationQueryDetailComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [],
  entryComponents: [
    ATMAllocationQueryDetailComponent
  ]
})
export class ATMAllocationQueryModule { }
