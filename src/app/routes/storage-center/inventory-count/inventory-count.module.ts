import { NgModule } from '@angular/core';
import { SharedModule } from "@shared";
import { InventoryCountComponent } from "./inventory-count.component";

/**
 * 仓储中心-盘库
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    InventoryCountComponent
  ],
})
export class InventoryCountModule { }
