import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {ShelfComponent} from "./shelf.component";
import {ShelfAddComponent} from "./shelf-add/shelf-add.modal";
import {ShelfModComponent} from "./shelf-mod/shelf-mod.modal";
import {ShelfDetailComponent} from "./shelf-detail/shelf-detail.modal";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    //  声明模块内部定义的组件
    ShelfComponent,
    ShelfAddComponent,
    ShelfModComponent,
    ShelfDetailComponent,
  ],
  entryComponents: [
    // 指定了这个模块启动的时候应该启动的组件
    ShelfComponent,
    ShelfAddComponent,
    ShelfModComponent,
    ShelfDetailComponent
  ]
})
export class ShelfModule {

}
