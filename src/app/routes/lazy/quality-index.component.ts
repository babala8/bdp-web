import {Component, OnInit, OnDestroy} from '@angular/core';
import {LazyService} from './lazy.service';
import {SessionService} from '../../core/session.service';


@Component({
    selector: 'quality-index-component',
    // language=HTML
    template: `
        <span class="title">质量指标</span>
        <div nz-row style="height: 100%;" nzGutter="8">
            <div nz-col nzSpan="12" style="height: 100%;">
                <div echarts [options]="leftOption"></div>
            </div>
            <div nz-col nzSpan="12" style="height: 100%;">
                <div echarts [options]="rightOption"></div>
            </div>
        </div>
    `,
    // language=CSS
    styles: [`

        .title {
            position: absolute;
            top: -10px;
            left: 15px;
            font-size: 17px;
            background-repeat: no-repeat;
            background-image: url("./assets/images/screen/icon_Dashboard.png");
            background-size: 26px 16px;
            color: #3F82AC;
            background-position: 3px 5px;
            text-indent: 35px;
        }

        div[echarts] {
            height: 100%;
        }

    `]
})
export class QualityIndexComponent implements OnInit, OnDestroy {

    rightOption;
    leftOption;

    constructor(private service: LazyService,
                private session: SessionService) {
    }

    ngOnInit(): void {
        // this.initEchartsData();
      this.model_data();
    }

    ngOnDestroy(): void {
    }

    model_data(){
      const _data = {'element': {'returnRate': 33}, 'retCode': '00', 'retMsg': '查询Atm设备回钞率成功'};
      this.leftOption = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}'
        },
        series: [
          {
            name: name,
            type: 'gauge',
            min: 0,
            max: 2,
            detail: {
              formatter: function (value) {
                if (value) {
                  return value;
                } else {
                  return '无';
                }
              }
            },
            axisTick: {
              show: false
            },
            title: {
              textStyle: {
                color: '#fff'
              }
            },
            radius: '75%',
            center: ['50%', '58%'], //**调整仪表盘的位置**
            itemStyle: {},
            markLine: {
              lineStyle: {
                width: 2
              }
            },
            axisLine: {
              // 属性lineStyle控制线条样式
              lineStyle: {
                color: [[0.2, '#D36E75'], [0.8, '#4FA8ED'], [1, '#29C0C2']],
                width: 10
              }
            },
            // 指针
            pointer: {
              width: 4,
            },
            axisLabel: {
              show: true,
              distance: -50
            },
            splitLine: {
              show: false
            },
            data: [{
              name: 'ATM回钞率',
              value: _data.element.returnRate
            }],

          }
        ]
      };
      const data = {'element': {'proportion': 0.8}, 'retCode': '00', 'retMsg': '查询网点收付量占比成功'};
      this.rightOption = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}'
        },
        series: [
          {
            name: name,
            type: 'gauge',
            min: 0,
            max: 2,
            detail: {
              formatter: function (value) {
                if (value) {
                  return value;
                } else {
                  return '无';
                }
              }
            },
            axisTick: {
              show: false
            },
            title: {
              textStyle: {
                color: '#fff'
              }
            },
            radius: '75%',
            center: ['50%', '58%'], //**调整仪表盘的位置**
            itemStyle: {},
            markLine: {
              lineStyle: {
                width: 2
              }
            },
            axisLine: {
              // 属性lineStyle控制线条样式
              lineStyle: {
                color: [[0.2, '#D36E75'], [0.8, '#4FA8ED'], [1, '#29C0C2']],
                width: 10
              }
            },
            // 指针
            pointer: {
              width: 4,
            },
            axisLabel: {
              show: true,
              distance: -50
            },
            splitLine: {
              show: false
            },
            data: [{
              name: 'CRS收支比',
              value: data.element.proportion
            }]
          }
        ]
      };
    }

    initEchartsData() {
        const params = {orgNo: this.session.orgNo};
        this.service.getAtmCashReturnRate(params).subscribe(_data => {
            // const data = {'element': {'returnRate': 33}, 'retCode': '00', 'retMsg': '查询Atm设备回钞率成功'};
            this.leftOption = {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}'
                },
                series: [
                    {
                        name: name,
                        type: 'gauge',
                        min: 0,
                        max: 2,
                        detail: {
                            formatter: function (value) {
                                if (value) {
                                    return value;
                                } else {
                                    return '无';
                                }
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        title: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        radius: '75%',
                        center: ['50%', '58%'], //**调整仪表盘的位置**
                        itemStyle: {},
                        markLine: {
                            lineStyle: {
                                width: 2
                            }
                        },
                        axisLine: {
                            // 属性lineStyle控制线条样式
                            lineStyle: {
                                color: [[0.2, '#D36E75'], [0.8, '#4FA8ED'], [1, '#29C0C2']],
                                width: 10
                            }
                        },
                        // 指针
                        pointer: {
                            width: 4,
                        },
                        axisLabel: {
                            show: true,
                            distance: -50
                        },
                        splitLine: {
                            show: false
                        },
                        data: [{
                            name: 'ATM回钞率',
                            value: _data.entity.returnRate
                        }],

                    }
                ]
            };
        });
        this.service.getOrgTransProportionByOrgNo(params).subscribe(_data => {
            // const data = {'element': {'proportion': 0.8}, 'retCode': '00', 'retMsg': '查询网点收付量占比成功'};
            this.rightOption = {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}'
                },
                series: [
                    {
                        name: name,
                        type: 'gauge',
                        min: 0,
                        max: 2,
                        detail: {
                            formatter: function (value) {
                                if (value) {
                                    return value;
                                } else {
                                    return '无';
                                }
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        title: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        radius: '75%',
                        center: ['50%', '58%'], //**调整仪表盘的位置**
                        itemStyle: {},
                        markLine: {
                            lineStyle: {
                                width: 2
                            }
                        },
                        axisLine: {
                            // 属性lineStyle控制线条样式
                            lineStyle: {
                                color: [[0.2, '#D36E75'], [0.8, '#4FA8ED'], [1, '#29C0C2']],
                                width: 10
                            }
                        },
                        // 指针
                        pointer: {
                            width: 4,
                        },
                        axisLabel: {
                            show: true,
                            distance: -50
                        },
                        splitLine: {
                            show: false
                        },
                        data: [{
                            name: 'CRS收支比',
                            value: _data.entity.proportion
                        }]
                    }
                ]
            };

        });

    }
}
