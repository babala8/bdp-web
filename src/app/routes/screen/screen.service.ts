 import {Injectable} from '@angular/core';
// import 'rxjs/add/operator/map';
import { of } from 'rxjs';
// import {of} from 'rxjs/observable/of';

@Injectable()
export class ScreenService {

    constructor() {
    }

    getScreenDef() {
        return of({
            'columns': [
                {
                    'size': 25,
                    'rows': [
                        {
                            'size': 25,
                            'comp': {
                                c_Name: 'QualityIndexComponent'
                            }
                        },
                        {
                            'size': 45,
                            'comp': {
                                c_Name: 'CashModuleComponent'
                            }
                        },
                        {
                            'size': 30,
                            'comp': {
                                c_Name: 'TransactionRatioComponent'
                            }
                        }
                    ]
                },
                {
                    'size': 48,
                    'rows': [
                        {
                            'size': 25,
                            'comp': {
                                c_Name: 'CashRepertoryComponent'
                            }
                        },
                        {
                            'size': 75,
                            'comp': {
                                // c_Name: 'TransactionDistAnalysisComponent',
                                // c_Name: 'TransactionTypeAnalysisComponent'
                                c_Name: 'DemoCarouselComponent'
                            }
                        }
                    ]
                },
                {
                    'size': 27,
                    'rows': [
                        {
                            'size': 55,
                            'comp': {
                                c_Name: 'ServiceRankModuleComponent'
                            }
                        },
                        {
                            'size': 45,
                            'comp': {
                                c_Name: 'TransctionListComponent'
                            }
                        }
                    ]
                }
            ]
        });
    }

}
