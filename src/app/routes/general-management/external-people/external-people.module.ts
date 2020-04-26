import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {ExternalPeopleComponent} from "./external-people.component";
import {ExternalPeopleAddComponent} from "./add/external-people-add.component";
import {ExternalPeopleAddMutipleComponent} from "./add/external-people-add-mutiple.component";
import {ExternalPeopleModComponent} from "./mod/external-people-mod.component";

/**
 * 外包人员管理模块
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ExternalPeopleComponent,
    ExternalPeopleAddComponent,
    ExternalPeopleAddMutipleComponent,
    ExternalPeopleModComponent
  ],
  entryComponents: [
    ExternalPeopleAddComponent,
    ExternalPeopleAddMutipleComponent,
    ExternalPeopleModComponent
  ],
  exports: []
})
export class ExternalPeopleModule { }
