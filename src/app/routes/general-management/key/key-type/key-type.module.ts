import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {KeyTypeComponent} from "./key-type.component";
import {ModKeyComponent} from "./component/mod/mod-key.component";
import {AddKeyComponent} from "./component/add/add-key.component";


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    KeyTypeComponent,
    ModKeyComponent,
    AddKeyComponent
  ],
  entryComponents: [
    ModKeyComponent,
    AddKeyComponent
  ],
})
export class KeyTypeModule { }
