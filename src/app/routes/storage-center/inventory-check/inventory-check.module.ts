import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DetailComponent } from './detail/detail.component';
import { InventoryCheckComponent } from './inventory-check.component';

/** 库存核实模块 */
@NgModule({
  declarations: [
    InventoryCheckComponent,
    DetailComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [DetailComponent]
})
export class InventoryCheckModule { }
