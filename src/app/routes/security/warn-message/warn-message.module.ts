import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {WarnMessageComponent} from "./warn-message.component";
import {WarnMessageService} from "./warn-message.service";

@NgModule({
  declarations: [
    WarnMessageComponent,
  ],
  imports: [
    SharedModule
  ],
  entryComponents:[
  ],
  providers:[]
})
export class WarnMessageModule{ }
