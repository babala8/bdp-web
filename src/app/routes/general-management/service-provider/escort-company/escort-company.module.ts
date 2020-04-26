import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { EscortCompanyComponent } from './escort-company.component';
import { EscortCompanyAddComponent } from './add/escort-company-add.component';
import { EscortCompanyModComponent } from './mod/escort-company-mod.component';
import { EscortCompanyAddMutipleComponent } from './add/escort-company-add-mutiple.component';

/**
 * 服务商信息模块
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    EscortCompanyComponent,
    EscortCompanyAddComponent,
    EscortCompanyModComponent,
    EscortCompanyAddMutipleComponent
  ],
  entryComponents: [
    EscortCompanyAddComponent,
    EscortCompanyModComponent,
    EscortCompanyAddMutipleComponent
  ],
  exports: []
})
export class EscortCompanyModule {

}
