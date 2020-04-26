import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {AddPostScheduleWeekComponent} from "./component/week/add/add-postSchedule-week.component";
import {ModPostScheduleWeekComponent} from "./component/week/mod/mod-postSchedule-week.component";
import {ModPostScheduleMonthComponent} from "./component/month/mod/mod-postSchedule-month.component";
import {AddPostScheduleMonthComponent} from "./component/month/add/add-postSchedule-month.component";
import {AddPostScheduleSubmitComponent} from "./component/add-postSchedule-submit.component";
import { ScheduleMouldComponent } from "./schedule-mould.component";

@NgModule({
  imports : [
    SharedModule,

  ],
  declarations : [
    ScheduleMouldComponent,
    AddPostScheduleWeekComponent,
    ModPostScheduleWeekComponent,
    AddPostScheduleSubmitComponent,
    AddPostScheduleMonthComponent,
    ModPostScheduleMonthComponent
  ],
  providers : [
  ],
  entryComponents : [
    AddPostScheduleWeekComponent,
    ModPostScheduleWeekComponent,
    AddPostScheduleSubmitComponent,
    AddPostScheduleMonthComponent,
    ModPostScheduleMonthComponent
  ]
})
export class ScheduleMouldModule { }
