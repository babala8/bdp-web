import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
// i18n
import { TranslateModule } from '@ngx-translate/core';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { SelectAddressComponent } from '@shared/components/select-address.component';
import { SelectClrCenterComponent } from '@shared/components/select-clr-center.component';
import { SelectDispatchLineComponent } from '@shared/components/select-dispatch-line.component';
import { OrgTreeComponent } from '@shared/components/org-tree.component';
import { DetailTableComponent } from '@shared/components/detail-table.component';
import {AppManagerComponent} from '../layout/app-manager/app.manager.component';
import { EnumInfoComponent } from '@shared/components/enum-info.component';
import { SingleLineComponent } from '@shared/components/single-line.component';
import { AuthIdDirective } from '@shared/directives/auth-id.directive';
import { OperateFlowChartComponent } from '@shared/components/operate-flow-chart.component';

const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule,
];
// #endregion

// #region your componets & directives
const COMPONENTS = [
  SelectAddressComponent,
  SelectClrCenterComponent,
  SelectDispatchLineComponent,
  SingleLineComponent,
  OrgTreeComponent,
  DetailTableComponent,
  AppManagerComponent,
  EnumInfoComponent,
  OperateFlowChartComponent,
];
const DIRECTIVES = [
  AuthIdDirective
];

// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents:[SelectAddressComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {
}
