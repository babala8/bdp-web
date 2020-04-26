import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthGuard } from '@core/guard/auth-guard.service';
import { AuthService } from '@core/guard/auth.service';
import { LoginGuard } from '@core/guard/login-guard.service';
import { SessionService } from '@core/session.service';
import { NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { WebsocketService } from './websocket.service';
import { EventBus } from './utils.service';

@NgModule({
  providers: [
    SessionService,
    LoginGuard,
    AuthService,
    AuthGuard,
    WebsocketService,
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzRight: '0px', nzTop: '80%', nzDuration: 0, nzMaxStack: 100 } },
    EventBus
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
