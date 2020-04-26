import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {KeyGroupComponent} from "./key-group.component";
import {AddKeyGroupComponent} from "./add/add-key-group.component";
import {ModKeyGroupComponent} from "./mod/mod-key-group.component";

@NgModule(
  {
  imports: [
    SharedModule
  ],
  declarations: [
    KeyGroupComponent,
    AddKeyGroupComponent,
    ModKeyGroupComponent,
  ],
  entryComponents: [
    AddKeyGroupComponent,
    ModKeyGroupComponent
  ],
  providers:[
  ]
})
export class KeyGroupModule { }
