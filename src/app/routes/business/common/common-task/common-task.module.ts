import { NgModule } from '@angular/core';
import { CommonTaskComponent } from './common-task.component';
import { SharedModule } from '@shared';
import { ApplyDetailComponent } from './detail/apply-detail.component';
import { ProgressComponent } from './process/progress.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    CommonTaskComponent,
    ApplyDetailComponent,
    ProgressComponent
  ],
  providers: [
  ],
  entryComponents: [
    ApplyDetailComponent,
    ProgressComponent
  ]
})
export class CommonTaskModule {

}
