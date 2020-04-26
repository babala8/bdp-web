import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SpecialDateComponent } from './special-date.component';
import { SpecialDateService } from './special-date.service';
import { SpecialDateAddComponent } from './special-date-add/special-date-add.component';
import { SpecialDateModComponent } from './special-date-mod/special-date-mod.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SpecialDateComponent,
    SpecialDateAddComponent,
    SpecialDateModComponent,
  ],
  entryComponents: [
    SpecialDateAddComponent,
    SpecialDateModComponent,
  ],
  providers: [
    SpecialDateService,
  ]
})
export class SpecialDateModule { }
