import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


const route: Routes = [

  {path: 'customer',loadChildren: 'app/routes/channel-center/customer/customer.module#CustomerModule'},
  {path: 'ATM',loadChildren: 'app/routes/channel-center/ATM/ATM.module#ATMModule'},

];

@NgModule({
  imports: [
    RouterModule.forChild(route),
  ],
  declarations: [
  ],
  providers: [],
  entryComponents: [],
})
export class ChannelCenterModule {

}
