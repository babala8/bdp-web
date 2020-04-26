import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {TagReaderComponent} from "./tag-reader.component";
import {ModReaderComponent} from "./mod/mod-reader.component";
import {AddReaderComponent} from "./add/add-reader.component";

/**
 * 标签读写器模块
 */
@NgModule({
  declarations: [
    TagReaderComponent,
    ModReaderComponent,
    AddReaderComponent,
  ],
  imports: [
    SharedModule
  ],
  providers: [

  ],
  entryComponents: [
    AddReaderComponent,
    ModReaderComponent
  ]
})
export class TagReaderModule { }
