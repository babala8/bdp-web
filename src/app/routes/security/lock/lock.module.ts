import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LockInfoModule } from './lock-info/lock-info.module';
import { LockInfoComponent } from './lock-info/lock-info.component';
import { LockLogComponent } from './lock-log/lock-log.component';
import { LockMonitorComponent } from './lock-monitor/lock-monitor.component';
import { LockMonitorModule } from './lock-monitor/lock-monitor.module';
import { LockLogModule } from './lock-log/lock-log.module';

const route: Routes = [
  { path: 'lock-info', component: LockInfoComponent, data: { title: '电子锁信息管理' }},
  { path: 'lock-log', component: LockLogComponent, data: { title: '电子锁日志管理' }},
  { path: 'lock-monitor', component: LockMonitorComponent, data: { title: '电子锁监控' }},
];

@NgModule({
  imports: [
    SharedModule,
    LockInfoModule,
    LockMonitorModule,
    LockLogModule,
    RouterModule.forChild(route)],
  exports: [],
  declarations: [],
  providers: [],
})
export class LockModule {
}
