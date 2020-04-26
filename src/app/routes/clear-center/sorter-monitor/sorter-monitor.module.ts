import {NgModule} from '@angular/core';
import {SorterMonitorComponent} from './sorter-monitor.component';
import {SharedModule} from '@shared/shared.module';
import {NgxEchartsModule} from 'ngx-echarts';
import { TaskListComponent } from './component/task-list.component';

/**
 * 清分机监控
 */
@NgModule({
    imports : [
        SharedModule,
        NgxEchartsModule
    ],
    declarations : [
        SorterMonitorComponent,
        TaskListComponent
    ],
    providers : [],
    entryComponents: [
      TaskListComponent
    ]
})

export class SorterMonitorModule {
  constructor() {

  }
}
