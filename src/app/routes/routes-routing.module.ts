import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout

// dashboard pages
// passport pages
import { UserLoginComponent } from './login/login.component';
// single pages

import { AppManagerComponent, EmptyContainerComponent } from '../layout/app-manager/app.manager.component';
import { LoginGuard } from '@core/guard/login-guard.service';
import { AuthGuard } from '@core/guard/auth-guard.service';
import { LayoutSidebarComponent } from '../layout/sidebar/layout.sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutSidebarComponent,
    canActivate: [LoginGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'home', redirectTo: 'app/app2/home', pathMatch: 'full' },
      { path: 'business', loadChildren: 'app/routes/business/business.module#BusinessModule'},
      { path: 'user-center', loadChildren: 'app/routes/user-center/user-center.module#UserCenterModule'},
      { path: 'channel-center', loadChildren: 'app/routes/channel-center/channel-center.module#ChannelCenterModule' },
      { path: 'circulation', loadChildren: 'app/routes/circulation/circulation.module#CirculationModule' },
      { path: 'clear-center', loadChildren: 'app/routes/clear-center/clear-center.module#ClearCenterModule' },
      { path: 'finance-center', loadChildren: 'app/routes/finance-center/finance-center.module#FinanceCenterModule' },
      { path: 'general-management', loadChildren: 'app/routes/general-management/general-management.module#GeneralManagementModule' },
      { path: 'params', loadChildren: 'app/routes/params/params.module#ParamsModule' },
      { path: 'security', loadChildren: 'app/routes/security/security.module#SecurityModule' },
      { path: 'service-center', loadChildren: 'app/routes/service-center/service-center.module#ServiceCenterModule' },
      { path: 'storage-center', loadChildren: 'app/routes/storage-center/storage-center.module#StorageCenterModule' },
      { path: 'line-center', loadChildren: 'app/routes/line-center/line-center.module#LineCenterModule' },
      {
        path: 'app/:appName',
        children: [
          {
            path: '**',
            component: EmptyContainerComponent,
            data: {
              tab: false,
            },
          },
        ],
        data: {
          tab: false,
        },
      },
    ],
  },

  { path: 'zijin-exception', loadChildren: './zijin-exception/zijin-exception.module#ZijinExceptionModule' },

  {
    path: 'login',
    component: UserLoginComponent,
    data: { tab: false },
  },
  {
    path: 'screen',
    loadChildren: 'app/routes/screen/screen.module#ScreenModule',
    data: { tab: false },
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        // NOTICE: If you use `reuse-tab` detail and turn on keepingScroll you can set to `disabled`
        // Pls refer to https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
      },
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule {
}
