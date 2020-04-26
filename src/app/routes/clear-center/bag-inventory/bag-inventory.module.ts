import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { BagInventoryCheckComponent } from './component/bag-inventory-check.component';
import {BagInventoryComponent} from "./bag-inventory.component";

/**
 * 箱包清点
 */
@NgModule({
  declarations: [
    BagInventoryComponent,
    BagInventoryCheckComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [],
  entryComponents:[
    BagInventoryCheckComponent
  ]

})
export class BagInventoryModule {

}
