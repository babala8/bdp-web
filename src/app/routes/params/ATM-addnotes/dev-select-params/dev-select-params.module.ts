import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DevSelectParamsComponent } from './dev-select-params.component';
import { DevSelectParamsService } from './dev-select-params.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DevSelectParamsComponent,
  ],
  entryComponents: [
    
  ],
  providers: [
    DevSelectParamsService,
  ]
})
export class DevSelectParamsModule { }
