import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
import { VisitApplyComponent } from './visit-apply/visit-apply.component';
import { VisitApplyModule } from './visit-apply/visit-apply.module';

const route: Routes = [
  { path: 'visit-apply', component: VisitApplyComponent, data: { title: '上门预约申请' } },
];

@NgModule({
  imports: [
    SharedModule,
    VisitApplyModule,
    RouterModule.forChild(route)
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class DtdModule {

}
