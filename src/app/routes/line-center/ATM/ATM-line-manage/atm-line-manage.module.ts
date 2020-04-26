import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ATMLineManageComponent } from './atm-line-manage.component';
import { ATMLineManageService } from './atm-line-manage.service';
import { ATMLineManageAddComponent } from './ATM-line-add/atm-line-manage-add.component';
import { ATMLineManageModComponent } from './ATM-line-mod/atm-line-manage-mod.component';
import { ATMLineManageDetailComponent } from './ATM-line-detail/atm-line-manage-detail.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ATMLineManageComponent,
    ATMLineManageAddComponent,
    ATMLineManageModComponent,
    ATMLineManageDetailComponent,
  ],
  entryComponents: [
    ATMLineManageAddComponent,
    ATMLineManageModComponent,
    ATMLineManageDetailComponent,
  ],
  providers : [
    ATMLineManageService,
  ]
})
export class ATMLineManageModule { }
