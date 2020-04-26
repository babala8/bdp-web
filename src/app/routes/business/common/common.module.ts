import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CommonApplyModule } from './common-apply/common-apply.module';
import { CommonTaskModule } from './common-task/common-task.module';
import { RouterModule, Routes } from '@angular/router';
import {CommonApplyComponent} from "./common-apply/common-apply.component";

const route: Routes = [
  {
    path: 'common-apply',
    component: CommonApplyComponent,
    data: {title: '创新业务'}
  },
  {
    path: 'common-task',
    component: CommonApplyComponent,
    data: {title: '创新任务管理'}
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonApplyModule,
    CommonTaskModule,
    RouterModule.forChild(route)
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class CommonModule {

}
