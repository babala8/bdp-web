import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AddnotesMonitorComponent } from './addnotes-monitor.component';
import { CirculationService } from '../circulation.service';
import { AddnotesMonitorMapComponent } from './tauro-map/addnotes-monitor-map.component';
import { BaiduMapModule } from 'angular2-baidu-map';

@NgModule({
  imports: [
    SharedModule,
    BaiduMapModule,
  ],
  declarations: [
    AddnotesMonitorComponent,
    AddnotesMonitorMapComponent
  ],
  entryComponents: [AddnotesMonitorMapComponent],
  providers: [CirculationService],
})
export class AddnotesMonitorModule {
}
