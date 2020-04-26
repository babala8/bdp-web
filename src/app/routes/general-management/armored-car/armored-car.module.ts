import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {ArmoredCarComponent} from "./armored-car.component";
import {ArmoredCarAddComponent} from "./add/armoredCar-add.component";
import {ArmoredCarAddMutipleComponent} from "./add/armoredCar-add-mutiple.component";
import {ArmoredCarModComponent} from "./mod/armoredCar-mod.component";

/**
 * 押运车管理模块
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ArmoredCarComponent,
    ArmoredCarAddComponent,
    ArmoredCarModComponent,
    ArmoredCarAddMutipleComponent
  ],
  entryComponents: [
    ArmoredCarAddComponent,
    ArmoredCarModComponent,
    ArmoredCarAddMutipleComponent
  ],
})
export class ArmoredCarModule { }
