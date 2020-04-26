import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PasswordComponent } from "./password.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        PasswordComponent
    ],
    entryComponents: [
      PasswordComponent
    ],
  providers: [],
  exports: [
    PasswordComponent
  ]
})
export class PasswordModule {

    constructor() {
    }

}
