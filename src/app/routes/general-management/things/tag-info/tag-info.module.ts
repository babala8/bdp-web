import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {TagComponent} from "./tag.component";
import {AddTagComponent} from "./add/add-tag.component";
import {ModTagComponent} from "./mod/mod-tag.component";
import {TagAddMutipleComponent} from "./add/tag-add-mutiple.component";

/**
 * 标签信息管理模块
 */
@NgModule({
  declarations: [
    TagComponent,
    AddTagComponent,
    ModTagComponent,
    TagAddMutipleComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [

  ],
  entryComponents: [
    AddTagComponent,
    ModTagComponent,
    TagAddMutipleComponent
  ]
})
export class TagInfoModule { }
