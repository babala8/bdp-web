import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import { LockLogComponent } from './lock-log.component';


@NgModule({
    imports : [
        SharedModule
    ],
    declarations : [
      LockLogComponent,
    ],
    providers : [],
    entryComponents : []
})

export class LockLogModule {}
