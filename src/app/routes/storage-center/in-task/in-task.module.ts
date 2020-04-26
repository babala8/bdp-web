import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { InTaskComponent } from './in-task.component';

/** 入库任务管理模块 */
@NgModule({
  declarations: [
    InTaskComponent
  ],
  imports: [
    SharedModule
  ]
})
export class InTaskModule { }
