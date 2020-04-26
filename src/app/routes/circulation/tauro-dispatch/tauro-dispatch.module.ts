import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import { TauroDispatchComponent} from "./tauro-dispatch.component";
import { DetailTauroDispatchComponent } from './detail/detail-tauro-dispatch.component';
import { TauroDispatchService } from './tauro-dispatch.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [TauroDispatchComponent,DetailTauroDispatchComponent],
  entryComponents: [DetailTauroDispatchComponent],
  providers:[TauroDispatchService]
})
export class TauroDispatchModule { }
