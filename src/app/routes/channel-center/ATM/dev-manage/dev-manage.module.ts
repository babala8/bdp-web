import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DevManageComponent } from './dev-manage.component';
import { ChannelCenterService } from '../../channel-center.service';
import { DevManageAddComponent } from './add/dev-manage-add.component';
import { DevManageModifyComponent } from './mod/dev-manage-modify.component';
import { DevManageDetailComponent } from './detail/dev-manage-detail.component';
import { DevManageReviseComponent } from './revise/dev-manage-revise.component';

/**
 * 设备信息管理模块
 */
@NgModule({
    imports : [
        SharedModule
    ],
    declarations : [
        DevManageComponent,
        DevManageAddComponent,
        DevManageModifyComponent,
        DevManageDetailComponent,
        DevManageReviseComponent,
    ],
    providers : [
    ],
    entryComponents : [
        DevManageAddComponent,
        DevManageModifyComponent,
        DevManageDetailComponent,
        DevManageReviseComponent,
    ]
})

export class DevManageModule {}
