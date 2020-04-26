import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BusinessInventoryComponent } from './business-inventory.component';
import { DetailComponent } from './detail/detail.component';

/** 业务库库存管理模块 */
@NgModule({
  declarations: [
    BusinessInventoryComponent,
    DetailComponent,
  ],
  imports: [
    SharedModule
  ],
  entryComponents:[
    DetailComponent,
  ],
})
export class BusinessInventoryModule { }
