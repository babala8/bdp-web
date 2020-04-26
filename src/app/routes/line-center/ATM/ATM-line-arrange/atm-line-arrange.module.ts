import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ATMLineArrangeComponent } from './atm-line-arrange.component';
import { ATMLineArrangeService } from './atm-line-arrange.service';
import { ATMLineArrangeGenerateComponent } from './ATM-line-arrange-generate/atm-line-arrange-generate.component';
import { ATMLineArrangeDevDetailComponent } from './ATM-line-arrange-dev-detail/ATM-line-arrange-dev-detail.component';
import { ATMLineArrangeDevMapComponent } from './ATM-line-arrange-dev-map/ATM-line-arrange-dev-map.component';
import { ATMLineArrangeDayDetailComponent } from './ATM-line-arrange-day-detail/atm-line-arrange-day-detail.component';
import { ATMLineArrangeDayModComponent } from './ATM-line-arrange-day-mod/atm-line-arrange-day-mod.component';
import { ATMLineArrangeModComponent } from './ATM-line-arrange-mod/atm-line-arrange-mod.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ATMLineArrangeComponent,
    ATMLineArrangeGenerateComponent,
    ATMLineArrangeDevDetailComponent,
    ATMLineArrangeDevMapComponent,
    ATMLineArrangeDayDetailComponent,
    ATMLineArrangeDayModComponent,
    ATMLineArrangeModComponent,
  ],
  entryComponents: [
    ATMLineArrangeGenerateComponent,
    ATMLineArrangeDevDetailComponent,
    ATMLineArrangeDevMapComponent,
    ATMLineArrangeDayDetailComponent,
    ATMLineArrangeDayModComponent,
    ATMLineArrangeModComponent,
  ],
  providers : [
    ATMLineArrangeService,
  ]
})
export class ATMLineArrangeModule { }
