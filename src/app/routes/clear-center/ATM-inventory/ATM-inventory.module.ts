import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ATMInventoryComponent } from './ATM-inventory.component';
import { ATMInventoryDetailComponent } from './detail/ATM-inventory-detail.component';

/**
 * ATM清点信息查询
 */
@NgModule({
  declarations: [
    ATMInventoryComponent,
    ATMInventoryDetailComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [],
  entryComponents: [
    ATMInventoryDetailComponent
  ]
})
export class ATMInventoryModule { }
