import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { HolidayLineComponent } from './holiday-line.component';
import { HolidayLineService } from './holiday-line.service';
import { HolidayLineBatchModComponent } from './holiday-line-batch-mod/holiday-line-batch-mod.component';
import { HolidayLineDayDetailComponent } from './holiday-line-day-detail/holiday-line-day-detail.component';
import { HolidayLineDayModComponent } from './holiday-line-day-mod/holiday-line-day-mod.component';
import { HolidayLineModComponent } from './holiday-line-mod/holiday-line-mod.component';
import { HolidayLineOrgDetailComponent } from './holiday-line-org-detail/holiday-line-org-detail.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HolidayLineComponent,
    HolidayLineBatchModComponent,
    HolidayLineDayDetailComponent,
    HolidayLineDayModComponent,
    HolidayLineModComponent,
    HolidayLineOrgDetailComponent,
  ],
  entryComponents: [
    HolidayLineBatchModComponent,
    HolidayLineDayDetailComponent,
    HolidayLineDayModComponent,
    HolidayLineModComponent,
    HolidayLineOrgDetailComponent,
  ],
  providers: [
    HolidayLineService,
  ]
})
export class HolidayLineModule { }
