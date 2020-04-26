import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '@shared/shared.module';
// import {ZjDashboardModule} from '@delon/abc';
import {HomeService} from './home.service';
import {DashboardService} from './dashboard.service';
import { ZjDashboardModule } from '../../../../projects/zijin/dashboard/src/public_api';

@NgModule({
    imports: [
        SharedModule,
        ZjDashboardModule.forRoot(DashboardService),
        HomeRoutingModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
        HomeService
    ]
})
export class HomeModule {

}
