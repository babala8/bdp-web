import {NgModule} from '@angular/core';
import { KeyDistributeModule } from './key-distribute/key-distribute.module';
import { HandheldsReceiveModule } from './handhelds-receive/handhelds-receive.module';
import { AddnotesMonitorModule } from './addnotes-monitor/addnotes-monitor.module';
import { EscortArrangeModule } from './escort-arrange/escort-arrange.module';
import { RouterModule, Routes } from '@angular/router';
import { KeyDistributeComponent } from './key-distribute/key-distribute.component';
import { HandheldsReceiveComponent } from './handhelds-receive/handhelds-receive.component';
import { AddnotesMonitorComponent } from './addnotes-monitor/addnotes-monitor.component';
import { EscortArrangeComponent } from './escort-arrange/escort-arrange.component';
import { FormsModule } from '@angular/forms';
import { OrderManageComponent } from './orderManage/orderManage.component';
import { OrderManageModule } from './orderManage/orderManage.module';

const routes: Routes = [
  {path: 'park-manage', loadChildren: 'app/routes/circulation/park-manage/park-manage.module#ParkManageModule'},
  {
    path: 'key-distribute',
    component: KeyDistributeComponent,
    data: { title: '钥匙串分配' },
  },
  {
    path: 'handhelds-receive',
    component: HandheldsReceiveComponent,
    data: { title: '手持机领用' },
  },
  {
    path: 'addnotes-monitor',
    component: AddnotesMonitorComponent,
    data: { title: '加钞流转监控' },
  },
  {
    path: 'escort-arrange',
    component: EscortArrangeComponent,
    data: { title: '押运人员排班' },
  },
  {
    path: 'task-manage',
    component: OrderManageComponent,
    data: { title: '订单管理' }
  }

];
@NgModule({
  imports: [
    KeyDistributeModule,
    HandheldsReceiveModule,
    AddnotesMonitorModule,
    EscortArrangeModule,
    OrderManageModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: [],
  entryComponents: [],

})
export class CirculationModule{}
