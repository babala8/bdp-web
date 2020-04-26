import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AttributesAddComponent } from './attr-add/attributes-add.component';
import { SkuDetailComponent } from './detail/sku-detail.component';
import { SkuAddComponent } from './sku-add/sku-add.component';
import { SkuManageComponent } from './sku-manage.component';
import { SkuModComponent } from './sku-mod/sku-mod.component';

const COMPONENTS = [SkuManageComponent],
  ENTRY_COMPONENTS = [SkuDetailComponent, SkuAddComponent, SkuModComponent, AttributesAddComponent];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ...COMPONENTS, ...ENTRY_COMPONENTS
  ],
  exports: [SkuManageComponent],
  entryComponents: ENTRY_COMPONENTS

})
export class SkuManageModule { }
