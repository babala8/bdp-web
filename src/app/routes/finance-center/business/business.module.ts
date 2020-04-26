import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import { BusinessComponent } from './business.component';
import { FinanceCenterService } from '../finance-center.service';


@NgModule({
    imports : [
        SharedModule
    ],
    declarations : [
      BusinessComponent,
    ],
    providers : [
      FinanceCenterService
    ],
    entryComponents : [

    ]
})

export class BusinessModule {}
