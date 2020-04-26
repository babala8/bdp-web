import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessInventoryComponent } from './business-inventory/business-inventory.component';
import { BusinessInventoryModule } from './business-inventory/business-inventory.module';
import { CashInventoryComponent } from './cash-inventory/cash-inventory.component';
import { CashInventoryModule } from './cash-inventory/cash-inventory.module';
import { InTaskComponent } from './in-task/in-task.component';
import { InTaskModule } from './in-task/in-task.module';
import { InventoryCheckComponent } from './inventory-check/inventory-check.component';
import { InventoryCheckModule } from './inventory-check/inventory-check.module';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorModule } from './monitor/monitor.module';
import { OutTaskComponent} from "./out-task/out-task.component";
import { OutTaskModule } from './out-task/out-task.module';
import { SecurityAccessCheckInComponent } from './security-access-check-in/security-access-check-in.component';
import { SecurityAccessCheckInModule } from './security-access-check-in/security-access-check-in.module';
import { SecurityAccessCheckOutComponent } from './security-access-check-out/security-access-check-out.component';
import { SecurityAccessCheckOutModule } from './security-access-check-out/security-access-check-out.module';
import { StorageCenterService } from './storage-center.service';
import { InventoryCountComponent } from './inventory-count/inventory-count.component';
import { InventoryCountModule } from "./inventory-count/inventory-count.module";
import { InventoryInspectComponent } from './inventory-inspect/inventory-inspect.component';
import { InventoryInspectModule } from "./inventory-inspect/inventory-inspect.module";
import {ShelfComponent} from "./shelf/shelf.component";
import {ShelfModule} from "./shelf/shelf.module";

const route: Routes = [
  {
    path: 'business-inventory',
    component: BusinessInventoryComponent,
    data: { title: '业务库库存查询' },
  },
  {
    path: 'cash-inventory',
    component: CashInventoryComponent,
    data: {title: '现金库库存查询'}
  },
  {
    path: 'in-task',
    component: InTaskComponent,
    data: {title: '入库任务管理'}
  },
  {
    path: 'out-task',
    component: OutTaskComponent,
    data: {title: '出库任务管理'}
  },
  {
    path: 'monitor',
    component: MonitorComponent,
    data: {title: '出入库监控'}
  },
  {
    path: 'inventory-check',
    component: InventoryCheckComponent,
    data: {title: '库存核实'}
  },
  {
    path: 'security-access-check-in',
    component: SecurityAccessCheckInComponent,
    data: {title: '门禁审核入库'}
  },
  {
    path: 'security-access-check-out',
    component: SecurityAccessCheckOutComponent,
    data: {title: '门禁审核出库'}
  },
  {
    path: 'inventory-count',
    component: InventoryCountComponent,
    data: {title: '盘库'}
  },
  {
    path: 'inventory-inspect',
    component: InventoryInspectComponent,
    data: {title: '盘库'}
  },
  {
    path: 'shelf',
    component: ShelfComponent,
    data: {title: '笼车/托盘信息管理'}
  }
];

/** 仓储中心 */
@NgModule({
  imports: [
    BusinessInventoryModule,
    CashInventoryModule,
    InTaskModule,
    OutTaskModule,
    MonitorModule,
    InventoryCheckModule,
    SecurityAccessCheckOutModule,
    SecurityAccessCheckInModule,
    InventoryCountModule,
    InventoryInspectModule,
    ShelfModule,
    RouterModule.forChild(route),
  ],
  providers: [StorageCenterService],
})
export class StorageCenterModule { }
