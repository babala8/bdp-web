import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
import { NetpointLineArrangeComponent } from './netpoint-line-arrange/netpoint-line-arrange.component';
import { NetpointLineManageComponent } from './netpoint-line-manage/netpoint-line-manage.component';
import { NetpointLineArrangeModule } from './netpoint-line-arrange/netpoint-line-arrange.module';
import { NetpointLineManageModule } from './netpoint-line-manage/netpoint-line-manage.module';

const route: Routes = [
  { path: 'netpoint-line-arrange', component: NetpointLineArrangeComponent, data: { title: '网点线路排班管理' } },
  { path: 'netpoint-line-manage', component: NetpointLineManageComponent, data: { title: '网点线路管理' } },
];

@NgModule({
  imports: [
    SharedModule,
    NetpointLineArrangeModule,
    NetpointLineManageModule,
    RouterModule.forChild(route),
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class NetpointLineModule {

}
