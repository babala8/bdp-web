import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {RouterModule, Routes} from "@angular/router";
import {KeyGroupComponent} from "./key-group/key-group.component";
import {KeyInfoComponent} from "./key-info/key-info.component";
import {KeyTypeComponent} from "./key-type/key-type.component";
import {KeyInfoModule} from "./key-info/key-info.module";
import {KeyGroupModule} from "./key-group/key-group.module";
import {KeyTypeModule} from "./key-type/key-type.module";

const route: Routes = [
  {
    path: 'key-group',
    component: KeyGroupComponent,
    data: { title: '钥匙串管理' },
  },
  {
    path: 'key-info',
    component: KeyInfoComponent,
    data: { title: '钥匙管理' },
  },
  {
    path: 'key-type',
    component: KeyTypeComponent,
    data: { title: '钥匙类型' },
  },
];
@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    KeyGroupModule,
    KeyInfoModule,
    KeyTypeModule,
    RouterModule.forChild(route)
  ]
})
export class KeyModule { }
