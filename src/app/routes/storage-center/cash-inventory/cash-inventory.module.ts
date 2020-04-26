import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CashInventoryComponent } from './cash-inventory.component';
import { DetailComponent } from './detail/detail.component';

/** 现金库库存管理模块 */
@NgModule({
  declarations: [
    CashInventoryComponent,
    DetailComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [DetailComponent]
})
export class CashInventoryModule { }
