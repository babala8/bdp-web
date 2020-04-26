import {NgModule} from '@angular/core';
import {QualityIndexComponent} from './quality-index.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {DeviceBenefitRankComponent} from './device-benefit-rank.component';
import {SharedModule} from '@shared';
import {CashRepertoryComponent} from './cash-repertory.component';
import {AngularSplitModule} from 'angular-split';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TurnOverComponent} from './turn-over.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DemoCarouselComponent} from './carousel.component';
// import {ABCMODULES} from 'app/delon.module';
import {TransactionRatioComponent} from './transaction-ratio.component';
import {ServiceQualityRankComponent} from './service-quality-rank.component';
import {TransactionDistAnalysisComponent} from './transaction-dist-analysis.component';
import {TransactionTypeAnalysisComponent} from './transaction-type-analysis.component';
import {CashModuleComponent} from './cash-module.component'
import {TransctionListComponent} from './transction-list.component';
import {DevDetailComponent} from './dev-detail.component';
import {ServiceRankModuleComponent} from './service-rank-module.component';
import {OrgDetailComponent} from './org-detail.component';
import {LazyService} from './lazy.service';
import {PrepService} from './prep.service';
import { ZjCarouselModule } from '../../../../projects/zijin/dashboard/src/public_api';
// import { ZjCarouselModule } from '@zijin/dashboard';


const COMPONENTS = [
    QualityIndexComponent,
    DeviceBenefitRankComponent,
    CashRepertoryComponent,
    TurnOverComponent,
    DemoCarouselComponent,
    TransactionRatioComponent,
    ServiceQualityRankComponent,
    TransactionDistAnalysisComponent,
    TransactionTypeAnalysisComponent,
    TransctionListComponent,
    CashModuleComponent,
    DevDetailComponent,
    OrgDetailComponent,
    ServiceRankModuleComponent
];

@NgModule({
    imports: [
        NgxEchartsModule,
        SharedModule,
        AngularSplitModule,
        PerfectScrollbarModule,
        NgZorroAntdModule,
        ZjCarouselModule,
        // ABCMODULES
    ],
    declarations: [
        ...COMPONENTS
    ],
    entryComponents: [
        ...COMPONENTS
    ],
    providers: [
        LazyService,
        PrepService,
    ]
})

export class NMLLazyModule {

    paths = {
        DemoCarouselComponent: DemoCarouselComponent,
        TurnOverComponent: TurnOverComponent,
        DeviceBenefitRankComponent: DeviceBenefitRankComponent,
        QualityIndexComponent: QualityIndexComponent,
        TransactionRatioComponent: TransactionRatioComponent,
        CashRepertoryComponent: CashRepertoryComponent,
        ServiceQualityRankComponent: ServiceQualityRankComponent,
        TransactionDistAnalysisComponent: TransactionDistAnalysisComponent,
        CashModuleComponent: CashModuleComponent,
        ServiceRankModuleComponent: ServiceRankModuleComponent,
        TransactionTypeAnalysisComponent: TransactionTypeAnalysisComponent,
        TransctionListComponent: TransctionListComponent,
    };

}
