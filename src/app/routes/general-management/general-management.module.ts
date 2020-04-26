import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {ExternalPeopleModule} from "./external-people/external-people.module";
import {VaultComponent} from "./vault-manage/vault.component";
import {VaultManageModule} from "./vault-manage/vault-manage.module";
import {ArmoredCarComponent} from "./armored-car/armored-car.component";
import {ArmoredCarModule} from "./armored-car/armored-car.module";
import {ExternalPeopleComponent} from "./external-people/external-people.component";

const route: Routes = [

  { path: 'post-schedule', loadChildren: 'app/routes/general-management/post-schedule/post-schedule.module#PostScheduleModule' },
  { path: 'things', loadChildren: 'app/routes/general-management/things/things.module#ThingsModule' },
  { path: 'service-provider', loadChildren: 'app/routes/general-management/service-provider/service-provider.module#ServiceProviderModule' },
  { path: 'key', loadChildren: 'app/routes/general-management/key/key.module#KeyModule' },
  { path: 'time-job', loadChildren: 'app/routes/general-management/time-job/time-job.module#TimeJobModule' },

  {
    path: 'external-people',
    component: ExternalPeopleComponent,
    data: {title: '外包人员管理'}
  },
  {
    path: 'vault-manage',
    component: VaultComponent,
    data: { title: '金库管理' },
  },
  {
    path: 'armored-car',
    component: ArmoredCarComponent,
    data: { title: '运钞车管理' },
  },

];

@NgModule({
  imports: [
    ExternalPeopleModule,
    VaultManageModule,
    ArmoredCarModule,
    RouterModule.forChild(route)],
  exports: [],
  declarations: [],
  entryComponents: [],
  providers: [],
})
export class GeneralManagementModule { }
