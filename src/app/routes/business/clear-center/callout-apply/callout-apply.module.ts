import {NgModule} from '@angular/core';
import { CalloutApplyComponent } from './callout-apply.component';
import { SharedModule } from '@shared';
import { ApplyComponent } from './apply/apply.component';
import { CashAddComponent } from './apply/cash-add/cash-add.component';
import { DetailComponent } from './detail/detail.component';
import { ModComponent } from './mod/mod.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalloutApplyComponent,
    ApplyComponent,
    CashAddComponent,
    DetailComponent,
    ModComponent,
  ],
  entryComponents: [
    ApplyComponent,
    CashAddComponent,
    DetailComponent,
    ModComponent,
  ],
  exports: []
})
export class CalloutApplyModule {

}
