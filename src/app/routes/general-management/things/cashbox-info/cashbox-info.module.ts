import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {CashboxInfoComponent} from "./cashbox-info.component";
import {CassetteModComponent} from "./mod/cassette-mod.component";
import { ThingsService } from "../things.service";
import { CashboxAddComponent } from "./add/cashbox-add.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    CashboxInfoComponent,
    CashboxAddComponent,
    CassetteModComponent
  ],
  providers: [
    ThingsService
  ],
  entryComponents: [
    CashboxAddComponent,
    CassetteModComponent
  ],
  exports: [
    CashboxInfoComponent,
  ]
})
export class CashBoxInfoModule { }
