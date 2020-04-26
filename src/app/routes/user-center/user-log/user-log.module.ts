import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {UserLogComponent} from "./user-log.component";

@NgModule({
  declarations: [
    UserLogComponent,
  ],
  imports: [
    SharedModule
  ],
  entryComponents:[],
  providers:[]
})
export class UserLogModule{ }
