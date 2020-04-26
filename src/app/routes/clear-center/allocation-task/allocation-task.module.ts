import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CommonModule } from '@angular/common';
import { AllocationTaskComponent } from './allocation-task.component';
import { SorterDistributeComponent } from './component/allocation-task-branch.component';

/**
 * 配款任务管理模块
 */
@NgModule({
  declarations: [
    AllocationTaskComponent,
    SorterDistributeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    SorterDistributeComponent
  ]
})
export class AllocationTaskModule { }
