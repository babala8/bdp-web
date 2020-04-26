import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { SpecialRuleExecComponent } from './special-rule-exec.component';
import { SpecialRuleExecAddComponent } from './special-rule-exec-add/special-rule-exec-add.component';
import { SpecialRuleExecService } from './special-rule-exec.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SpecialRuleExecComponent,
    SpecialRuleExecAddComponent,
  ],
  entryComponents: [
    SpecialRuleExecAddComponent,
  ],
  providers: [
    SpecialRuleExecService,
  ]
})
export class SpecialRuleExecModule { }
