import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import { LockMonitorComponent } from './lock-monitor.component';

@NgModule({
    imports : [
        SharedModule
    ],
    declarations : [
      LockMonitorComponent

    ],
    providers : [],
    entryComponents : [
    ]
})

export class LockMonitorModule {}
