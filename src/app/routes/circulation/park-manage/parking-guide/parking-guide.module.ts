import {NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { ParkingGuideComponent } from './parking-guide.component';
import { ParkManageService } from '../park-manage.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers : [
    ParkManageService
  ],
  declarations: [
    ParkingGuideComponent,
  ]
})
export class ParkingGuideModule {

}
