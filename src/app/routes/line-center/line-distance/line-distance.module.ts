import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LineDistanceComponent } from './line-distance.component';
import { LineDistanceService } from './line-distance.service';
import { LineDistanceLinkComponent } from './line-distance-link/line-distance-link.component';
import { BaiduMapModule } from 'angular2-baidu-map';

@NgModule({
  imports: [
    SharedModule,
    BaiduMapModule
  ],
  declarations: [
    LineDistanceComponent,
    LineDistanceLinkComponent,
  ],
  entryComponents: [
    LineDistanceLinkComponent,
  ],
  providers: [
    LineDistanceService,
  ]
})
export class LineDistanceModule { }
