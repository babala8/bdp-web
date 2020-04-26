import { NgModule } from '@angular/core';
import { SharedModule } from "@shared";
import { SecurityAccessCheckInComponent } from './security-access-check-in.component';

/** 门禁审核入库模块 */
@NgModule({
  declarations: [
    SecurityAccessCheckInComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class SecurityAccessCheckInModule { }
