import {NgModule} from '@angular/core';
import {DevVendorComponent} from './dev-vendor.component';
import {SharedModule} from '@shared/shared.module';
import {DevVendorAddComponent} from './add/dev-vendor-add.component';
import {DevVendorModifyComponent} from './mod/dev-vendor-modify.component';
import { CommonModule } from '@angular/common';

/**
 * 设备品牌管理模块
 */
@NgModule({
    imports : [
        SharedModule,
        CommonModule
    ],
    declarations : [
        DevVendorComponent,
        DevVendorAddComponent,
        DevVendorModifyComponent

    ],
    providers : [
    ],
    entryComponents: [
        DevVendorAddComponent,
        DevVendorModifyComponent
    ]
})

export class DevVendorModule {
  constructor() {

  }
}
