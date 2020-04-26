import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {CallinManageComponent} from './callin-manage.component';
import { DetailComponent } from './notes-allocation-detail/detail.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations:[
    CallinManageComponent,
    DetailComponent
  ],
  entryComponents: [
    DetailComponent
  ],
  exports: []
})
export class CallinManageModule {

}
