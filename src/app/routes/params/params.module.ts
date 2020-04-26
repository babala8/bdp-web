import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SysParamsComponent} from "./sys-params/sys-params.component";
import {SysParamsModule} from "./sys-params/sys-params.module";

const route: Routes = [

  {
    path: 'params-manage',
    component: SysParamsComponent,
    data: { title: '参数管理' },
  },
  { path: 'ATM-addnotes', loadChildren: './ATM-addnotes/ATM-addnotes.module#ATMAddnotesModule'},
];

@NgModule({
  imports: [
    SysParamsModule,
    RouterModule.forChild(route)
  ],
  exports: [],
  declarations: [],
  entryComponents: [],
  providers: [],
})
export class ParamsModule { }
