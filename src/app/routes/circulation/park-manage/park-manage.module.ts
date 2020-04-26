import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { ParkManageService } from './park-manage.service';
import { ParkingGuideComponent } from './parking-guide/parking-guide.component';
import { ParkingGuideModule } from './parking-guide/parking-guide.module';

const route: Routes = [
  {
    path: 'parking-guide',
    component: ParkingGuideComponent,
    data: { title: '泊车引导' },
  }

];

@NgModule({
  imports: [
    ParkingGuideModule,
    SharedModule,
    RouterModule.forChild(route)],
  exports: [],
  declarations: [],
  providers: [ParkManageService],
})
export class ParkManageModule {
}
