import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AssignComponent } from './assign/assign.modal';
import { BoxAddComponent } from './assign/box-add/box-add.modal';
import { NetpointDistributeComponent } from './netpoint-distribute.component';
import { NetpointModule } from '../../business/netpoint/netpoint.module';

/**
 * 网点领现配款
 */
@NgModule({
    imports: [
        SharedModule,NetpointModule
    ],
    exports: [
        NetpointDistributeComponent
    ],
    declarations: [
        NetpointDistributeComponent,
        AssignComponent,
        BoxAddComponent
    ],
    entryComponents: [
        AssignComponent,
        BoxAddComponent
    ]
})
export class NetpointDistributeModule { }
