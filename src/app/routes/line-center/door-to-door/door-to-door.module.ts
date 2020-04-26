import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
import { DtdLineArrangeComponent } from './dtd-line-arrange/dtd-line-arrange.component';
import { DtdLineManageComponent } from './dtd-line-manage/dtd-line-manage.component';
import { DtdLineArrangeModule } from './dtd-line-arrange/dtd-line-arrange.module';
import { DtdLineManageModule } from './dtd-line-manage/dtd-line-manage.module';

const route: Routes = [
  { path: 'dtd-line-arrange', component: DtdLineArrangeComponent, data: { title: '上门线路排班管理' } },
  { path: 'dtd-line-manage', component: DtdLineManageComponent, data: { title: '上门线路管理' } },
];

@NgModule({
  imports: [
    SharedModule,
    DtdLineArrangeModule,
    DtdLineManageModule,
    RouterModule.forChild(route),
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class DoorToDoorModule {

}
