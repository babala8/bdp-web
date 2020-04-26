import { NgModule } from '@angular/core';
import { SharedModule } from "@shared";
import { InventoryInspectComponent } from "./inventory-inspect.component";

/**
 * 仓储中心-查库
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    InventoryInspectComponent
  ],
})
export class InventoryInspectModule { }
