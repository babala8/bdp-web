import { NgModule } from '@angular/core';
import { EscortArrangeComponent } from './escort-arrange.component';
import { CirculationService } from '../circulation.service';
import { EscortArrangeAddComponent } from './add/escort-arrange-add.component';
import { EscortArrangeModifyComponent } from './mod/escort-arrange-modify.component';
import { SharedModule } from '../../../shared/shared.module';

/**
 * 押运人员排班管理模块
 */
@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        EscortArrangeComponent,
        EscortArrangeAddComponent,
        EscortArrangeModifyComponent
    ],
    entryComponents: [
        EscortArrangeAddComponent,
        EscortArrangeModifyComponent
    ],
  providers: []
})
export class EscortArrangeModule {

}
