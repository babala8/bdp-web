import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import { SecurityWarningComponent } from './security-warning.component';
import { SecurityWarningService } from './security-warning.service';
import { DetailComponent } from './detail/detail.component';
import { HandleSecurityWarnComponent } from './handle/handle-securityWarn.component';


@NgModule({
  imports : [
    SharedModule
  ],
  declarations : [
    SecurityWarningComponent,
    DetailComponent,
    HandleSecurityWarnComponent
  ],
  providers : [],
  entryComponents : [
    DetailComponent,
    HandleSecurityWarnComponent
  ]
})

export class SecurityWarningModule {}
