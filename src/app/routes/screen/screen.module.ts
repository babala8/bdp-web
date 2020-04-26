import {NgModule, SystemJsNgModuleLoader} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {ScreenComponent} from './screen.component';
import {ScreenRoutingModule} from './screen-routing.module';
import {ScreenService} from './screen.service';
import {provideRoutes} from '@angular/router';
import { ZjScreenModule } from '../../../../projects/zijin/dashboard/src/public_api';
import { RuntimeScreenComponent } from './runtime-screen.component';
// import { ZjScreenModule } from '@zijin/dashboard';

@NgModule({
    imports: [
        SharedModule,
        ZjScreenModule.forRoot(ScreenService),
        ScreenRoutingModule,
    ],
    declarations: [
        ScreenComponent,
      RuntimeScreenComponent,
    ],
    providers: [
        SystemJsNgModuleLoader,
        provideRoutes([
            { loadChildren: 'app/routes/lazy/nml-lazy.module#NMLLazyModule' }
        ])
    ],
})
export class ScreenModule {

}
