import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// passport pages
import { UserLoginComponent } from './login/login.component';
// single pages
import { EmptyContainerComponent } from '../layout/app-manager/app.manager.component';

const COMPONENTS = [
  // passport pages
  UserLoginComponent,
  // single pages

  // app manager
  EmptyContainerComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
