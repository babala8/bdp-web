import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {CassetteBagAddComponent} from "./add/cassetteBag-add.component";
import {CassetteBagModComponent} from "./mod/cassetteBag-mod.component";
import {CassetteBagComponent} from "./cassette-bag.component";

/**
 * 钞袋信息管理模块
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CassetteBagComponent,
    CassetteBagAddComponent,
    CassetteBagModComponent
  ],
  entryComponents: [
    CassetteBagAddComponent,
    CassetteBagModComponent
  ],
})
export class CassetteBagInfoModule { }
