import {NgModule} from '@angular/core';
import {SorterManageComponent} from './sorter-manage.component';
import {SharedModule} from '@shared/shared.module';
import {SorterAddComponent} from './add/sorter-add.component';
import {SorterModifyComponent} from './mod/sorter-modify.component';

/**
 * 清分机管理模块
 */
@NgModule({
    imports : [
        SharedModule
    ],
    declarations : [
        SorterManageComponent,
        SorterAddComponent,
        SorterModifyComponent
    ],
    providers : [],
    entryComponents: [
        SorterAddComponent,
        SorterModifyComponent
    ]
})

export class SorterManageModule {
  constructor() {

  }
}
