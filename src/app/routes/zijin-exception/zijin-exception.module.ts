import {NgModule} from '@angular/core';
import { Exception401Component } from './401.component';
import { ExceptionShareComponent } from './component/exception-share.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';

const COMPONENTS = [
  Exception401Component,
];
const routes: Routes = [
  { path: '401', component: Exception401Component, data: {text: '登录过期'} },
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ...COMPONENTS,
    ExceptionShareComponent
  ]

})
export class ZijinExceptionModule {

}
