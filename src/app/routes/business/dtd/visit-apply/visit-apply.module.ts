import { NgModule } from '@angular/core';
import { VisitApplyService } from './visit-apply.service';
import { SharedModule } from '@shared';
import { VisitApplyComponent } from './visit-apply.component';
import { VisitApplyAddComponent } from './visit-apply-add/visit-apply-add.component';
import { VisitApplyModComponent } from './visit-apply-mod/visit-apply-mod.component';

@NgModule({
  imports : [
    SharedModule,
  ],
  declarations : [
    VisitApplyComponent,
    VisitApplyAddComponent,
    VisitApplyModComponent,
  ],
  entryComponents: [
    VisitApplyAddComponent,
    VisitApplyModComponent,
  ],
  providers : [
    VisitApplyService,
  ]
})
export class VisitApplyModule { }
