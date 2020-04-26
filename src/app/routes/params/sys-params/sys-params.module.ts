import { NgModule } from '@angular/core';
import { SharedModule } from "@shared";
import { SysParamsComponent } from "./sys-params.component";
import { ParamsAddComponent } from "./component/add/params-add.component";
import { ParamsModifyComponent } from "./component/mod/params-modify.component";


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SysParamsComponent,
    ParamsAddComponent,
    ParamsModifyComponent
  ],
  entryComponents: [
    SysParamsComponent,
    ParamsAddComponent,
    ParamsModifyComponent
  ],
  providers: [

  ]
})
export class SysParamsModule { }
