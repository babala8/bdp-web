import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {PostManageComponent} from "./post-manage.component";
import {PostModifyComponent} from "./mod/post-modify.component";
import {PostAddComponent} from "./add/post-add.component";
import {PostDetailComponent} from "./detail/post-detail.components";

/**
 * 岗位管理模块
 */
@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    PostManageComponent,
    PostAddComponent,
    PostModifyComponent,
    PostDetailComponent,
  ],
  entryComponents: [
    PostAddComponent,
    PostModifyComponent,
    PostDetailComponent,
  ],
  providers: [

  ],
})
export class PostManageModule { }
