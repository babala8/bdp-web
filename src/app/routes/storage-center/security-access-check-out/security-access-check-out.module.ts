import { NgModule } from '@angular/core';
import { SharedModule } from "@shared";
import { SecurityAccessCheckOutComponent } from "./security-access-check-out.component";

/** 门禁审核出库模块 */
@NgModule({
  declarations: [
    SecurityAccessCheckOutComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class SecurityAccessCheckOutModule { }
