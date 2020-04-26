import { NgModule } from '@angular/core';
import { BaiduMapModule } from 'angular2-baidu-map';
import { SharedModule } from '@shared';
import { AddnotesPlanComponent } from './addnotes-plan.component';
import { AddnotesPlanSubmitComponent } from './add/addnotes-plan-submit/addnotes-plan-submit.component';
import { StepFormComponent } from './add/step-form/step-form.component';
import { DeviceSelectionComponent } from './add/device-selection/device-selection.component';
import { AdjustAtmsComponent } from './add/adjust-atms/adjust-atms.component';
import { AnalysisDevComponent } from './add/adjust-atms/analysis-addnotes-dev/analysis-dev.component';
// 自动分组组件
import { AutoGroupTspComponent } from './add/auto-group-tsp/auto-group-tsp.component';
import { AdjustGroupComponent } from './add/auto-group-tsp/adjust-group/adjust-group.component';
import { AdjustRouterComponent } from './add/auto-group-tsp/adjust-router/adjust-router.component';
import { GroupMapComponent } from './add/auto-group-tsp/group-map/group-map.component';
import { GroupRouterComponent } from './add/auto-group-tsp/group-router/group-router.component';
// 固定分组组件
import { FixGroupTspComponent } from './add/fix-group-tsp/fix-group-tsp.component';
import { AdjustRouterComponent as FixAdjustRouterComponent } from './add/fix-group-tsp/adjust-router/adjust-router.component';
import { AdjustGroupComponent as FixAdjustGroupComponent } from './add/fix-group-tsp/adjust-group/adjust-group.component';
import { GroupMapComponent as FixGroupMapComponent } from './add/fix-group-tsp/group-map/group-map.component';
import { GroupRouterComponent as FixGroupRouterComponent } from './add/fix-group-tsp/group-router/group-router.component';

import { DetailComponent } from './detail/detail.component';
import { AddnotesPlanAuditComponent } from './audit/addnotes-plan-audit.component';
import { AddnotesPlanAuditModal } from './audit/audit-modal/addnotes-plan-audit.modal';
import { AddnotesPlanService } from './addnotes-plan.service';
import { ReviseCrashPlanComponent as AnotherReviseCrashPlanComponent } from './reviseCrashPlan/revise-crash-plan.component';
import { AddCrashPlanComponent } from './addCrashPlan/add-crash-plan.component';
import { ReviseCrashPlanComponent } from './addCrashPlan/component/reviseCrashPlan.component';
import { NgxEchartsModule } from 'ngx-echarts';

const AUTO_GROUP_COMPONENTS = [AutoGroupTspComponent, AdjustGroupComponent, AdjustRouterComponent, GroupMapComponent, GroupRouterComponent];
const FIX_GROUP_COMPONENTS = [FixGroupTspComponent, FixAdjustRouterComponent, FixAdjustGroupComponent, FixGroupMapComponent, FixGroupRouterComponent];

@NgModule({
  imports: [
    SharedModule,
    BaiduMapModule,
    NgxEchartsModule
  ],
  declarations: [
    AddnotesPlanComponent,
    AddnotesPlanAuditComponent,
    AddnotesPlanSubmitComponent,
    DeviceSelectionComponent,
    AdjustAtmsComponent,
    AnalysisDevComponent,
    DetailComponent,
    StepFormComponent,
    AddnotesPlanAuditModal,
    AddCrashPlanComponent,
    ReviseCrashPlanComponent,
    AddCrashPlanComponent,
    AnotherReviseCrashPlanComponent,
    ...AUTO_GROUP_COMPONENTS,
    ...FIX_GROUP_COMPONENTS
  ],
  entryComponents: [
    AddnotesPlanSubmitComponent,
    DetailComponent,
    StepFormComponent,
    AddnotesPlanAuditModal,
    AddCrashPlanComponent,
    AnalysisDevComponent,
    ReviseCrashPlanComponent,
    AddCrashPlanComponent,
    ...AUTO_GROUP_COMPONENTS,
    ...FIX_GROUP_COMPONENTS
  ],
  providers: [
    AddnotesPlanService
  ],
})

export class AddntoesPlanModule {
}