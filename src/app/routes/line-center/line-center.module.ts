import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
import { HolidayLineComponent } from './holiday-line/holiday-line.component';
import { HolidayLineModule } from './holiday-line/holiday-line.module';
import { LineDistanceComponent } from './line-distance/line-distance.component';
import { LineDistanceModule } from './line-distance/line-distance.module';
import { BaiduMapModule } from 'angular2-baidu-map';

const routes: Routes = [
  { path: 'ATMLine', loadChildren: './ATM/ATM-line.module#ATMLineModule'},
  { path: 'door-to-door', loadChildren: './door-to-door/door-to-door.module#DoorToDoorModule'},
  { path: 'holiday-line', component: HolidayLineComponent, data: { title: '节假日线路排班管理' },},
  { path: 'line-distance', component: LineDistanceComponent, data: { title: '设备路程信息管理' },},
  { path: 'netpoint', loadChildren: './netpoint/netpoint-line.module#NetpointLineModule'},
];

@NgModule({
  imports: [
    SharedModule,
    HolidayLineModule,
    LineDistanceModule,
    BaiduMapModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: [],
  exports: []
})
export class LineCenterModule {

}
