import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
import { DevSelectParamsComponent } from './dev-select-params/dev-select-params.component';
import { SpecialDateComponent } from './special-date/special-date.component';
import { SpecialRuleComponent } from './special-rule/special-rule.component';
import { SpecialRuleExecComponent } from './special-rule-exec/special-rule-exec.component';
import { DevSelectParamsModule } from './dev-select-params/dev-select-params.module';
import { SpecialRuleExecModule } from './special-rule-exec/special-rule-exec.module';
import { SpecialRuleModule } from './special-rule/special-rule.module';
import { SpecialDateModule } from './special-date/special-date.module';

const route: Routes = [
  { path: 'dev-select-params', component: DevSelectParamsComponent, data: { title: '加钞设备选择参数管理' } },
  { path: 'special-date', component: SpecialDateComponent, data: { title: '特殊日期配钞参数管理' } },
  { path: 'special-rule', component: SpecialRuleComponent, data: { title: '加钞特殊规则管理' } },
  { path: 'special-rule-exec', component: SpecialRuleExecComponent, data: { title: '加钞特殊规则执行管理' } },
];

@NgModule({
  imports: [
    SharedModule,
    DevSelectParamsModule,
    SpecialDateModule,
    SpecialRuleModule,
    SpecialRuleExecModule,
    RouterModule.forChild(route),
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class ATMAddnotesModule {

}
