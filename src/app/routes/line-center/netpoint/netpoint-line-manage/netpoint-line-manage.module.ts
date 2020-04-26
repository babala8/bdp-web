import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { NetpointLineManageComponent } from './netpoint-line-manage.component';
import { NetpointLineManageService } from './netpoint-line-manage.service';
import { NetpointLineManageAddAddComponent } from './netpoint-line-manage-add/netpoint-line-manage-add.component';
import { NetpointLineManageDetailComponent } from './netpoint-line-manage-detail/netpoint-line-manage-detail.component';
import { NetpointLineManageModComponent } from './netpoint-line-manage-mod/netpoint-line-manage-mod.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    NetpointLineManageComponent,
    NetpointLineManageAddAddComponent,
    NetpointLineManageDetailComponent,
    NetpointLineManageModComponent,
  ],
  entryComponents: [
    NetpointLineManageAddAddComponent,
    NetpointLineManageDetailComponent,
    NetpointLineManageModComponent,
  ],
  providers : [
    NetpointLineManageService,
  ]
})
export class NetpointLineManageModule { }
