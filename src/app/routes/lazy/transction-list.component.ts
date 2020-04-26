import {Component, OnInit} from '@angular/core';
import {LazyService} from './lazy.service';
import {SessionService} from '../../core/session.service';

@Component({
    selector: 'transction-list',
    template: `
        <span class="title">设备收付类型占比</span>
        <div class="option" echarts [options]="option"></div>
    `,
    // language=CSS
    styles: [`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .title {
            position: absolute;
            top: -10px;
            left: 15px;
            font-size: 17px;
            text-indent: 34px;
            color: #3F82AC;
            background-repeat: no-repeat;
            background-image: url(./assets/images/screen/icon_cass.png);
            background-position: 3px 3px;
            background-size: 23px 17px;
        }

        .option {
            height: 100%;
            top: 21px;
        }
    `]
})

export class TransctionListComponent implements OnInit {

    option;
    legends = [];
    transction = {
        date: [],
        amountData: []
    };
    type = [
        {name: '存款金额', value: 'cdmAmt', color: '#B6A2DE'},
        {name: '取款金额', value: 'cwdAmt', color: '#3398DB'},
    ];

    amountType = ['cdmCount', 'cdmAmt', 'cwdCount', 'cwdAmt',];
    data1 = [];
    data2 = [];

    constructor(private service: LazyService,
                private session: SessionService) {
    }

    ngOnInit() {
        // this.getDevTransProportion();
        this.model_data();

    }

    model_data() {
        const data = {
            'retCode': '00',
            'retList': [{'proportionType': '付出型', 'devCatalog': 'CRS', 'nums': 677}, {
                'proportionType': '平衡型',
                'devCatalog': 'CRS',
                'nums': 400
            }, {'proportionType': '付出型', 'devCatalog': 'ATM', 'nums': 599}, {
                'proportionType': '回笼型',
                'devCatalog': 'CRS',
                'nums': 523
            }],
            'retMsg': '查询设备收付量类型成功'
        };

        const data1 = [{value: 0, name: '付出型'}, {value: 0, name: '回笼型'}, {value: 0, name: '平衡型'}];
        const data2 = [{value: 0, name: 'ATM'}, {value: 0, name: 'CRS'}];
        const xAxisData = [],
            seriesData = [[], []];
        data.retList.forEach(function (val, idx) {
            if (val.proportionType === '付出型') {
                if (val.devCatalog === 'ATM') {
                    data2[0].value += val.nums;
                } else {
                    data2[1].value += val.nums;
                }
                data1[0].value += val.nums;
            } else if (val.proportionType === '回笼型') {
                if (val.devCatalog === 'ATM') {
                    data2[0].value += val.nums;
                } else {
                    data2[1].value += val.nums;
                }
                data1[1].value += val.nums;
            } else if (val.proportionType === '平衡型') {
                if (val.devCatalog === 'ATM') {
                    data2[0].value += val.nums;
                } else {
                    data2[1].value += val.nums;
                }
                data1[2].value += val.nums;
            }
        });
        this.option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: '收付量',
                    type: 'pie',
                    radius: [0, '50%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    data: data1
                },
                {
                    name: '收付量',
                    type: 'pie',
                    radius: ['60%', '75%'],
                    data: data2
                }
            ]
        };


    }

    getDevTransProportion() {
        const params = {orgNo: this.session.orgNo};
        this.service.getDevTransProportion(params).subscribe(data => {
            const data1 = [{value: 0, name: '付出型'}, {value: 0, name: '回笼型'}, {value: 0, name: '平衡型'}];
            const data2 = [{value: 0, name: 'ATM'}, {value: 0, name: 'CRS'}];
            const xAxisData = [],
                seriesData = [[], []];
            data.retList.forEach(function (val, idx) {
                if (val.proportionType === '付出型') {
                    if (val.devCatalog === 'ATM') {
                        data2[0].value += val.nums;
                    } else {
                        data2[1].value += val.nums;
                    }
                    data1[0].value += val.nums;
                } else if (val.proportionType === '回笼型') {
                    if (val.devCatalog === 'ATM') {
                        data2[0].value += val.nums;
                    } else {
                        data2[1].value += val.nums;
                    }
                    data1[1].value += val.nums;
                } else if (val.proportionType === '平衡型') {
                    if (val.devCatalog === 'ATM') {
                        data2[0].value += val.nums;
                    } else {
                        data2[1].value += val.nums;
                    }
                    data1[2].value += val.nums;
                }
            });
            this.option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [
                    {
                        name: '收付量',
                        type: 'pie',
                        radius: [0, '50%'],

                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        data: data1
                    },
                    {
                        name: '收付量',
                        type: 'pie',
                        radius: ['60%', '75%'],
                        data: data2
                    }
                ]
            };
        });
    }
}
