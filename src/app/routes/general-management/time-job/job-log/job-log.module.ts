import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {JobLogComponent} from "./job-log.component";

@NgModule({
  declarations: [
    JobLogComponent,
  ],
  imports: [
    SharedModule
  ],
  entryComponents:[
  ],
  providers:[
  ]

})
export class JobLogModule { }
