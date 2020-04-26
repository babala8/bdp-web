import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared";
import {BusinessComponent} from "./business/business.component";
import {BusinessModule} from "./business/business.module";

const route: Routes = [
  {
    path: 'qryBusiness',
    component: BusinessComponent,
    data: { title: '交易查询' },
  }

];

@NgModule({
  imports: [
    SharedModule,
    BusinessModule,
    RouterModule.forChild(route)],
  exports: [],
  declarations: [],
  providers: [],
})
export class FinanceCenterModule { }
