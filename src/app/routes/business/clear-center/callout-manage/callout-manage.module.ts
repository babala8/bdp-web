import { NgModule } from '@angular/core';
import { CalloutManageComponent } from './callout-manage.component';
import { SharedModule } from '@shared';
import {DetailComponent} from './detail/detail.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalloutManageComponent,
    DetailComponent
  ],
  entryComponents: [
    DetailComponent
  ],
  exports: [],
})
export class CalloutManageModule {

}


