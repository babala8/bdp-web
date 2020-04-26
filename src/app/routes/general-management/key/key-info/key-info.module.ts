import { NgModule } from '@angular/core';
import {SharedModule} from "@shared";
import {KeyInfoComponent} from "./key-info.component";
import {KeyInfoAddComponent} from "./add/keyInfo-add.component";
import {KeyInfoModComponent} from "./mod/keyInfo-mod.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    KeyInfoComponent,
    KeyInfoAddComponent,
    KeyInfoModComponent
  ],
  entryComponents: [
    KeyInfoAddComponent,
    KeyInfoModComponent
  ],
  providers:[
  ],
})
export class KeyInfoModule { }
