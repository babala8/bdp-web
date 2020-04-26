import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SpecialRuleComponent } from './special-rule.component';
import { SpecialRuleAddComponent } from './special-rule-add/special-rule-add.component';
import { SpecialRuleDetailComponent } from './special-rule-detail/special-rule-detail.component';
import { SpecialRuleModComponent } from './special-rule-mod/special-rule-mod.component';
import { SpecialRuleService } from './special-rule.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SpecialRuleComponent,
    SpecialRuleAddComponent,
    SpecialRuleDetailComponent,
    SpecialRuleModComponent,
  ],
  entryComponents: [
    SpecialRuleAddComponent,
    SpecialRuleDetailComponent,
    SpecialRuleModComponent,
  ],
  providers: [
    SpecialRuleService,
  ],
})
export class SpecialRuleModule { }
