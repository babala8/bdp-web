import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { NetpointLineArrangeComponent } from './netpoint-line-arrange.component';
import { NetpointLineArrangeDayDetailComponent } from './netpoint-line-arrange-day-detail/netpoint-line-arrange-day-detail.component';
import { NetpointLineArrangeDayModComponent } from './netpoint-line-arrange-day-mod/netpoint-line-arrange-day-mod.component';
import { NetpointLineArrangeGenerateComponent } from './netpoint-line-arrange-generate/netpoint-line-arrange-generate.component';
import { NetpointLineArrangeModComponent } from './netpoint-line-arrange-mod/netpoint-line-arrange-mod.component';
import { NetpointLineArrangeOrgDetailComponent } from './netpoint-line-arrange-org-detail/netpoint-line-arrange-org-detail.component';
import { NetpointLineArrangeService } from './netpoint-line-arrange.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    NetpointLineArrangeComponent,
    NetpointLineArrangeDayDetailComponent,
    NetpointLineArrangeDayModComponent,
    NetpointLineArrangeGenerateComponent,
    NetpointLineArrangeModComponent,
    NetpointLineArrangeOrgDetailComponent,
  ],
  entryComponents: [
    NetpointLineArrangeDayDetailComponent,
    NetpointLineArrangeDayModComponent,
    NetpointLineArrangeGenerateComponent,
    NetpointLineArrangeModComponent,
    NetpointLineArrangeOrgDetailComponent,
  ],
  providers : [
    NetpointLineArrangeService,
  ]
})
export class NetpointLineArrangeModule { }
