import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import { CustomerTypeComponent } from './customer-type.component';

/**
 * 客户类型管理模块
 */
@NgModule({
    imports : [
        SharedModule
    ],
    declarations : [
        CustomerTypeComponent,
    ],
    providers : [
    ],
    entryComponents : [
    ]
})

export class CustomerTypeModule {}
