import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AllocationManageComponent } from './allocation-manage.component';
import { ProgressComponent } from './progress/progress.component';
import { SplitAllocationComponent } from './split/splitAllocation.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AllocationManageComponent,
    ProgressComponent,
    SplitAllocationComponent
  ],
  entryComponents: [
    ProgressComponent,
    SplitAllocationComponent
  ]
})

export class AllocationManageModule {
}
