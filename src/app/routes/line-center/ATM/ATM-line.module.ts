import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
import { ATMLineArrangeComponent } from './ATM-line-arrange/atm-line-arrange.component';
import { ATMLineManageComponent } from './ATM-line-manage/atm-line-manage.component';
import { ATMLineArrangeModule } from './ATM-line-arrange/atm-line-arrange.module';
import { ATMLineManageModule } from './ATM-line-manage/atm-line-manage.module';

const route: Routes = [
  { path: 'ATM-line-arrange', component: ATMLineArrangeComponent, data: { title: '加钞线路排班管理' } },
  { path: 'ATM-line-manage', component: ATMLineManageComponent, data: { title: '加钞线路管理' } },
];

@NgModule({
  imports: [
    SharedModule,
    ATMLineArrangeModule,
    ATMLineManageModule,
    RouterModule.forChild(route),
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class ATMLineModule {

}
