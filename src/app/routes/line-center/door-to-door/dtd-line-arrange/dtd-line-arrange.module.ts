import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DtdLineArrangeComponent } from './dtd-line-arrange.component';
import { DtdLineArrangeService } from './dtd-line-arrange.service';
import { DtdLineArrangeAddComponent } from './dtd-line-arrange-add/dtd-line-arrange-add.component';
import { DtdLineArrangeModComponent } from './dtd-line-arrange-mod/dtd-line-arrange-mod.component';
import { DtdLineArrangeDetailComponent } from './dtd-line-arrange-detail/dtd-line-arrange-detail.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DtdLineArrangeComponent,
    DtdLineArrangeAddComponent,
    DtdLineArrangeModComponent,
    DtdLineArrangeDetailComponent,
  ],
  entryComponents: [
    DtdLineArrangeAddComponent,
    DtdLineArrangeModComponent,
    DtdLineArrangeDetailComponent,
  ],
  providers: [
    DtdLineArrangeService,
  ],
})
export class DtdLineArrangeModule { }
