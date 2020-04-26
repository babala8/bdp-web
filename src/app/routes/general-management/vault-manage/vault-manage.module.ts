import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {VaultComponent} from "./vault.component";
import {VaultChangeNumComponent} from "./component/vault-changeNum.component";

/**
 * 金库信息管理模块
 */
@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    VaultComponent,
    VaultChangeNumComponent,
  ],
  entryComponents: [
    VaultChangeNumComponent,
  ],
  providers: [

  ],
})
export class VaultManageModule { }
