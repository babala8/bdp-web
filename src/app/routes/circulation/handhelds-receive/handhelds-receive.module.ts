import { NgModule } from '@angular/core';
import { CirculationService } from '../circulation.service';
import { HandheldsReceiveComponent } from './handhelds-receive.component';
import { SharedModule } from '@shared';
import { HandheldsReceiveAddComponent } from './add/handhelds-receive-add.component';
import { HandheldsReceiveModComponent } from './mod/handhelds-receive-mod.component';
import { HandheldsReceiveReviewComponent } from './review/handhelds-receive-review.component';
import { HandheldsReceiveReturnComponent } from './return/handhelds-receive-return.component';
import { HandheldsReceiveDetailComponent } from './detail/handhelds-receive-detail.component';

/**
 * 手持机领用管理模块
 */
@NgModule({
  declarations: [
    HandheldsReceiveComponent,
    HandheldsReceiveAddComponent,
    HandheldsReceiveModComponent,
    HandheldsReceiveReviewComponent,
    HandheldsReceiveReturnComponent,
    HandheldsReceiveDetailComponent,
  ],
  imports: [
    SharedModule,
  ],
  entryComponents:[
    HandheldsReceiveAddComponent,
    HandheldsReceiveReviewComponent,
    HandheldsReceiveReturnComponent,
    HandheldsReceiveDetailComponent
  ],
  providers:[
  ]

})
export class HandheldsReceiveModule { }
