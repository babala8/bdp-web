import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { CallinApplyComponent } from './callin-apply.component';
import { ApplyComponent } from './apply/apply.component';
import { BoxAddComponent } from './apply/box-add/box-add.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CallinApplyComponent,
    ApplyComponent,
    BoxAddComponent,
    DetailComponent
  ],
  entryComponents: [
    ApplyComponent,
    BoxAddComponent,
    DetailComponent
  ],
  exports: []
})
export class CallinApplyModule {

}
