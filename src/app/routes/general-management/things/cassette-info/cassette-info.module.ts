import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {CassetteInfoComponent} from "./cassette-info.component";
import {CassetteInfoAddComponent} from "./add/cassetteInfo-add.component";
import {CassetteInfoModComponent} from "./mod/cassetteInfo-mod.component";
import {CassetteAddMutipleComponent} from "./add/cassette-add-mutiple.component";

/**
 * 钞箱信息管理模块
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CassetteInfoComponent,
    CassetteInfoAddComponent,
    CassetteInfoModComponent,
    CassetteAddMutipleComponent
  ],
  entryComponents: [
    CassetteInfoAddComponent,
    CassetteInfoModComponent,
    CassetteAddMutipleComponent
  ],
  providers:[
  ]
})
export class CassetteInfoModule { }
