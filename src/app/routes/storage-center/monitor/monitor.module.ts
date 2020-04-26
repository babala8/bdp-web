import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MonitorComponent } from './monitor.component';

/** 出入库监控模块 */
@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    MonitorComponent
  ]
})
export class MonitorModule {

}
