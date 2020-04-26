import { NgModule } from '@angular/core';
import { SharedModule } from "@shared";
import { SchedulePlanComponent } from "./schedule-plan.component";
import { ModSchedulePlanMonthComponent } from "./component/month/mod-schedulePlan-month.component";
import { AddSchedulePlanSubmitComponent } from "./component/add-schedulePlan-submit.component";

@NgModule({
  imports : [
    SharedModule

  ],
  declarations : [
    SchedulePlanComponent,
    AddSchedulePlanSubmitComponent,
    ModSchedulePlanMonthComponent
  ],
  providers : [

  ],
  entryComponents : [
    AddSchedulePlanSubmitComponent,
    ModSchedulePlanMonthComponent
  ]
})
export class ShcedulePlanModule { }
