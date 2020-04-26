import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ATM', loadChildren: './ATM/ATM.module#ATMModule'},
  { path: 'clear-center', loadChildren: './clear-center/clear-center.module#ClearCenterModule'},
  { path: 'common', loadChildren: './common/common.module#CommonModule'},
  { path: 'dtd', loadChildren: './dtd/dtd.module#DtdModule'},
  { path: 'netpoint', loadChildren: './netpoint/netpoint.module#NetpointModule'},
  { path: 'exception-handing', loadChildren: './abnormal-task/abnormal-task.module#AbnormalTaskModule'},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: [],
  exports: []
})
export class BusinessModule {

}
