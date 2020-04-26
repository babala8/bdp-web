import { NgModule } from '@angular/core';
import {OutProgressComponent} from './out-progress/out-progress.component';
import {OutManageComponent} from './out-manage.component';
import {OutDetailComponent} from './out-detail/out-detail.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    OutManageComponent,
    OutProgressComponent,
    OutDetailComponent
  ],
  entryComponents: [
    OutProgressComponent,
    OutDetailComponent
  ]
})

export class OutManageModule {
}
