import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {DevTypeComponent} from './dev-type.component';
import {ChannelCenterService } from '../../channel-center.service';
import {DevTypeAddComponent} from './add/dev-type-add.component';
import {DevTypeModifyComponent} from './mod/dev-type-modify.component';
import {DevTypeDetailComponent} from './detail/dev-type-detail.component';

/**
 * 设备类型管理模块
 */
@NgModule({
    imports : [
        SharedModule
    ],
    declarations : [
        DevTypeComponent,
        DevTypeAddComponent,
        DevTypeModifyComponent,
        DevTypeDetailComponent
    ],
    providers : [
    ],
    entryComponents : [
        DevTypeAddComponent,
        DevTypeModifyComponent,
        DevTypeDetailComponent
    ]
})

export class DevTypeModule {}
