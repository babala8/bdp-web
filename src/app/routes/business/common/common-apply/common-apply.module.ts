import { NgModule } from '@angular/core';
import { CommonApplyComponent } from './common-apply.component';
import { ApplyAddComponent } from './apply/apply-add.component';
import { ApplyGoodsAddComponent } from './apply/goods-add/apply-goods-add.component';
import { SharedModule } from '@shared';
import { ApplyDetailComponent } from './detail/apply-detail.component';
import { ServiceSelectComponent } from './service-select/service-select.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    CommonApplyComponent,
    ServiceSelectComponent,
    ApplyAddComponent,
    ApplyGoodsAddComponent,
    ApplyDetailComponent,
  ],
  providers: [
  ],
  entryComponents: [
    ServiceSelectComponent,
    ApplyAddComponent,
    ApplyGoodsAddComponent,
    ApplyDetailComponent,
  ]
})
export class CommonApplyModule {

}
