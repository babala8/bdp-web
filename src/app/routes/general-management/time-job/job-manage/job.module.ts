import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {JobComponent} from "./job.component";
import {ModJobComponent} from "./mod/mod-job.component";

/**
 * 定时任务管理模块
 */
@NgModule({
  declarations: [
    JobComponent,
    ModJobComponent,
  ],
  imports: [
    SharedModule
  ],
  entryComponents:[
    ModJobComponent,
  ],
  providers:[

  ]

})
export class JobModule { }
