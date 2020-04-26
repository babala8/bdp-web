import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DtdLineManageComponent } from './dtd-line-manage.component';
import { DtdLineManageService } from './dtd-line-manage.service';
import { DtdLineAddComponent } from './dtdLine-add/dtd-line-add.component';
import { DtdLineModComponent } from './dtdLine-mod/dtd-line-mod.component';
import { DtdLineDetailComponent } from './dtdLine-detail/dtd-line-detail.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DtdLineManageComponent,
    DtdLineAddComponent,
    DtdLineModComponent,
    DtdLineDetailComponent,
  ],
  entryComponents: [
    DtdLineAddComponent,
    DtdLineModComponent,
    DtdLineDetailComponent,
  ],
  providers: [
    DtdLineManageService,
  ]
})
export class DtdLineManageModule { 

}
