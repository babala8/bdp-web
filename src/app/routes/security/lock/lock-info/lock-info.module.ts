import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import { LockInfoComponent } from './lock-info.component';
import { AddLockComponent } from './add/add-lock.component';
import { ModLockComponent } from './mod/mod-lock.component';


@NgModule({
    imports : [
        SharedModule
    ],
    declarations : [
      LockInfoComponent,
      AddLockComponent,
      ModLockComponent,

    ],
    providers : [],
    entryComponents : [
      AddLockComponent,
      ModLockComponent
    ]
})

export class LockInfoModule {}
