import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared";
import {PostManageComponent} from "./post-manage/post-manage.component";
import {ScheduleMouldComponent} from "./schedule-mould/schedule-mould.component";
import {SchedulePlanComponent} from "./shcedule-plan/schedule-plan.component";
import {PostManageModule} from "./post-manage/post-manage.module";
import {ScheduleMouldModule} from "./schedule-mould/schedule-mould.module";
import {ShcedulePlanModule} from "./shcedule-plan/shcedule-plan.module";

const route: Routes = [

  {
    path: 'post-manage',
    component: PostManageComponent,
    data: { title: '岗位管理' },
  },
  {
    path: 'schedule-mould',
    component: ScheduleMouldComponent,
    data: { title: '排班模板管理' },
  },
  {
    path: 'schedule-plan',
    component: SchedulePlanComponent,
    data: { title: '排班计划管理' },
  }

];

/**
 * 排班管理模块
 */
@NgModule({
  imports: [
    SharedModule,
    PostManageModule,
    ScheduleMouldModule,
    ShcedulePlanModule,
    RouterModule.forChild(route)],
  exports: [],
  declarations: [],
  entryComponents: [],
  providers: [],
})
export class PostScheduleModule { }
