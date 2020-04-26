import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CallinApplyModule } from './callin-apply/callin-apply.module';
import { CallinManageModule } from './callin-manage/callin-manage.module';
import { CalloutManageModule } from './callout-manage/callout-manage.module';
import { CalloutApplyModule } from './callout-apply/callout-apply.module';
import { RouterModule, Routes } from '@angular/router';
import { CallinManageComponent } from './callin-manage/callin-manage.component';
import { CallinApplyComponent } from './callin-apply/callin-apply.component';
import { CalloutApplyComponent } from './callout-apply/callout-apply.component';
import { CalloutManageComponent } from './callout-manage/callout-manage.component';

const route: Routes = [
  { path: 'callin-apply', component: CallinApplyComponent, data: { title: '现金调入申请' } },
  { path: 'callin-manage', component: CallinManageComponent, data: { title: '现金调入任务管理' } },
  { path: 'callout-apply', component: CalloutApplyComponent, data: { title: '现金调出申请' } },
  { path: 'callout-manage', component: CalloutManageComponent, data: { title: '现金调出任务管理' } },
];

@NgModule({
  imports: [
    SharedModule,
    CallinApplyModule,
    CallinManageModule,
    CalloutApplyModule,
    CalloutManageModule,
    RouterModule.forChild(route),
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class ClearCenterModule {

}
