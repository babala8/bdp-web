import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CassetteInfoComponent} from "./cassette-info/cassette-info.component";
import {CassetteBagComponent} from "./cassettebag-info/cassette-bag.component";
import {TagReaderComponent} from "./tag-reader/tag-reader.component";
import {TagComponent} from "./tag-info/tag.component";
import {SharedModule} from "@shared";
import {CashBoxInfoModule} from "./cashbox-info/cashbox-info.module";
import {CassetteBagInfoModule} from "./cassettebag-info/cassettebag-info.module";
import {TagInfoModule} from "./tag-info/tag-info.module";
import {TagReaderModule} from "./tag-reader/tag-reader.module";
import {CashboxInfoComponent} from "./cashbox-info/cashbox-info.component";
import {CassetteInfoModule} from "./cassette-info/cassette-info.module";

const route: Routes = [

  {
    path: 'cash-box',
    component: CashboxInfoComponent,
    data: { title: '款箱信息管理' },
  },
  {
    path: 'cassette',
    component: CassetteInfoComponent,
    data: { title: '钞箱信息管理' },
  },
  {
    path: 'cassette-bag',
    component: CassetteBagComponent,
    data: { title: '钞袋信息管理' },
  },
  {
    path: 'tag-reader',
    component: TagReaderComponent,
    data: { title: '标签读写器管理' },
  },
  {
    path: 'tag-info',
    component: TagComponent,
    data: { title: '标签管理' },
  },
];

@NgModule({
  imports: [
    SharedModule,
    CashBoxInfoModule,
    CassetteInfoModule,
    CassetteBagInfoModule,
    TagInfoModule,
    TagReaderModule,
    RouterModule.forChild(route)
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class ThingsModule { }
