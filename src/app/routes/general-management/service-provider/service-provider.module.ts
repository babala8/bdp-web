import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared";
import {DevCompanyComponent} from "./dev-company/dev-company.component";
import {DevCompanyModule} from "./dev-company/dev-company.module";
import {EscortCompanyComponent} from "./escort-company/escort-company.component";
import {EscortCompanyModule} from "./escort-company/escort-company.module";

const route: Routes = [

  {
    path: 'dev-company',
    component: DevCompanyComponent,
    data: { title: '设备维护商' },
  },
  {
    path: 'escort-provider',
    component: EscortCompanyComponent,
    data: { title: '押运公司' },
  }
];

@NgModule({
  imports: [
    SharedModule,
    DevCompanyModule,
    EscortCompanyModule,
    RouterModule.forChild(route),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class ServiceProviderModule { }
