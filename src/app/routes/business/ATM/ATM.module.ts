import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
import { AddnotesPlanComponent } from './addnotes-plan/addnotes-plan.component';
import { AddnotesTaskComponent } from './addnotes-task/addnotes-task.component';
import { AddnotesPlanAuditComponent } from './addnotes-plan/audit/addnotes-plan-audit.component';
import { AddntoesPlanModule } from './addnotes-plan/addnotes-plan.module';
import { AddnotesTaskModule } from './addnotes-task/addnotes-task.module';

const route: Routes = [
  { path: 'addnotes-plan', component: AddnotesPlanComponent, data: { title: '加钞计划管理' } },
  { path: 'addnotes-plan-audit', component: AddnotesPlanAuditComponent, data: { title: '加钞计划审核' } },
  { path: 'addnotes-task', component: AddnotesTaskComponent, data: { title: '加钞任务管理' } },
];

@NgModule({
  imports: [
    SharedModule,
    AddntoesPlanModule,
    AddnotesTaskModule,
    RouterModule.forChild(route),
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class ATMModule {

}
