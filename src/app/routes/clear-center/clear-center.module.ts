import { NgModule } from '@angular/core';
import { AllocationTaskModule } from './allocation-task/allocation-task.module';
import { ATMAllocationQueryModule } from './ATM-allocation-query/ATM-allocation-query.module';
import { BagInventoryComponent } from './bag-inventory/bag-inventory.component';
import { InventoryTaskModule } from './inventory-task/inventory-task.module';
import { NetpointDistributeModule } from './netpoint-distribute/netpoint-distribute.module';
import { SorterManageModule } from './sorter-manage/sorter-manage.module';
import { SorterMonitorModule } from './sorter-monitor/sorter-monitor.module';
import { RouterModule, Routes } from '@angular/router';
import { AllocationTaskComponent } from './allocation-task/allocation-task.component';
import { ATMAllocationQueryComponent } from './ATM-allocation-query/ATM-allocation-query.component';
import { InventoryTaskComponent } from './inventory-task/inventory-task.component';
import { NetpointDistributeComponent } from './netpoint-distribute/netpoint-distribute.component';
import { SorterManageComponent } from './sorter-manage/sorter-manage.component';
import { SorterMonitorComponent } from './sorter-monitor/sorter-monitor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { BagInventoryModule } from './bag-inventory/bag-inventory.module';
import { ATMInventoryModule } from './ATM-inventory/ATM-inventory.module';
import { ATMInventoryComponent } from './ATM-inventory/ATM-inventory.component';

const routes: Routes =[
  {
    path: 'allocation-task',
    component: AllocationTaskComponent,
    data: { title: '配款任务管理' },
  },
  {
    path: 'ATM-allocation-query',
    component: ATMAllocationQueryComponent,
    data: { title: 'ATM配钞信息查询' },
  },
  {
    path: 'bag-inventory',
    component: BagInventoryComponent,
    data: { title: '箱包清点' },
  },
  {
    path: 'inventory-task',
    component: InventoryTaskComponent,
    data: { title: '清点任务管理' },
  },
  {
    path: 'netpoint-distribute',
    component: NetpointDistributeComponent,
    data: { title: '网点领现配款' },
  },
  {
    path: 'sorter-manage',
    component: SorterManageComponent,
    data: { title: '清分机管理' },
  },
  {
    path: 'sorter-monitor',
    component: SorterMonitorComponent,
    data: { title: '清分机监控' },
  },
  {
    path: 'ATM-inventory',
    component: ATMInventoryComponent,
    data: { title: 'ATM清点信息查询' },
  }
];
@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AllocationTaskModule,
    ATMAllocationQueryModule,
    ATMInventoryModule,
    InventoryTaskModule,
    NetpointDistributeModule,
    SorterManageModule,
    SorterMonitorModule,
    BagInventoryModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: [],
  entryComponents: [],
})

export class ClearCenterModule {

}
