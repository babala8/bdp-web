import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared";
import {JobComponent} from "./job-manage/job.component";
import {JobLogComponent} from "./job-log/job-log.component";
import {JobModule} from "./job-manage/job.module";
import {JobLogModule} from "./job-log/job-log.module";

const route: Routes = [
  {
    path: 'job-manage',
    component: JobComponent,
    data: { title: '定时任务管理' },
  },
  {
    path: 'job-log-manage',
    component: JobLogComponent,
    data: { title: '定时任务日志管理' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    JobModule,
    JobLogModule,
    RouterModule.forChild(route)],
  exports: [],
  declarations: [],
  providers: [],
})
export class TimeJobModule { }
