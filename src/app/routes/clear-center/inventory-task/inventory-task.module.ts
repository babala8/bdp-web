import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CommonModule } from '@angular/common';
import { InventoryTaskComponent } from './inventory-task.component';
import { ClearingMachineDistributeComponent } from './component/Clearing-machine-distribute.component';

/**
 * 清点任务管理
 */
@NgModule({
  declarations: [
    InventoryTaskComponent,
    ClearingMachineDistributeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    ClearingMachineDistributeComponent
  ]
})
export class InventoryTaskModule { }
