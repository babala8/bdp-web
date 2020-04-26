import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { AddnotesPlanService } from '../../addnotes-plan.service';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import {Cache} from 'three';
import add = Cache.add;
import { SYS_CONS } from '../../../../../../models/constant';
import { SessionService } from '@core';
import { zip } from 'rxjs';
import { EMPTY_MAP } from '@angular/core/src/view';

class Model {
    private _list: Array<{
        devNo: string,
        table: string,
        checked: boolean,
        keyEventDetail: string
    }> = [];

    private _inited = false;

    get list() {
        return this._list;
    }

    get length() {
        return this._list.length;
    }

    set list(array) {
        if (!this._inited) {
            this._list = array;
        } else {
            throw new Error('list has inited!');
        }
    }

    addItem(item) {
        this._list.push(item);
    }

    get indeterminate() {
        const list = this._list;
        if (list.every(item => !!item.checked === false) || list.every(item => !!item.checked === true)) {
            return false;
        } else {
            return true;
        }
    }

    set allChecked(value: boolean) {
        this._list.forEach((item) => {
            item.checked = value;
        });
    }

    get allChecked(): boolean {
        if (this._list.length && this._list.every(item => !!item.checked === true)) {
            return true;
        }
        return false;
    }
}

@Component({
    selector: 'device-selection',
    templateUrl: './device-selection.html',
    styleUrls: ['./device-selection.component.less']
})
export class DeviceSelectionComponent implements OnInit {

    addnotesPlanNo: string;
    detail: any = {};
    detailList = [];
    flag = false;
    loading = true;
    loading_submit = false;
    dataSet: any[] = [{}];
    allDevList = [];
    midList = [];
    addData;
    modifying = true;
    rowAdding = false;
    rowSelected = false;
    colorList = [
        { color: '#99ccee' },
        { color: '#aaf6aa' },
        { color: '#bbfcee' },
    ]

    totalNums = 0;
    predictedModel = new Model();
    cashModel = new Model();
    maintainModel = new Model();
    preliminaryModel = new Model();
    runPlanModel = new Model();
    states = SYS_CONS.STATE.ADDNOTE_PLAN;

    constructor(
        private session: SessionService,
        private message: NzMessageService,
        private service: AddnotesPlanService) {
    }

    ngOnInit() { }

    sequenceByOrgNo(a, b) {
        if (parseInt(a.orgNo) > parseInt(b.orgNo)) {
            return 1;
        } else if (parseInt(a.orgNo) < parseInt(b.orgNo)) {
            return -1
        } else if (parseInt(a.devNo) > parseInt(b.devNo)){
            return 1;
        }else if (parseInt(a.devNo) < parseInt(b.devNo)){
            return -1;
        }else{
            return 0;
        }
    }

    sequenceByLineNo(a, b) {
        if (parseInt(a.lineNo) > parseInt(b.lineNo)) {
            return 1;
        } else if (parseInt(a.lineNo) < parseInt(b.lineNo)) {
            return -1
        } else if (parseInt(a.devNo) > parseInt(b.devNo)){
            return 1;
        }else if (parseInt(a.devNo) < parseInt(b.devNo)){
            return -1;
        }else{
            return 0;
        }
    }

    devSeparate(devList, type = null) {
        let lastLineNo;
        let lastOrgNo;
        let groundColor;
        let i;
        i = 0;
        if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.DYNAMIC) {
            console.log('11111', devList)
            devList.sort(this.sequenceByOrgNo);
            devList.forEach(data => {
                if (data.orgNo !== lastOrgNo) {
                    data.background = this.colorList[i].color;
                    i = (i + 1) % this.colorList.length;
                } else {
                    data.background = groundColor;
                }
                if (type) {
                    data.table = type;
                }
                lastOrgNo = data.orgNo;
                groundColor = data.background;
            });
        } else if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.FIX) {
            devList.sort(this.sequenceByLineNo);
            devList.forEach(data => {
                if (data.lineNo !== lastLineNo) {
                    data.background = this.colorList[i].color;
                    i = (i + 1) % this.colorList.length;
                } else {
                    data.background = groundColor;
                }
                if (type) {
                    data.table = type;
                }
                lastLineNo = data.lineNo;
                groundColor = data.background;
            });
        }
        return devList;
    }

    @Input()
    set planNo(planNo: string) {
        this.addnotesPlanNo = planNo;
        this.getAllTable();
    }

    getAllTable() {
        this.loading = true;
        const params = { addnotesPlanNo: this.addnotesPlanNo }, service = this.service;

        zip(
            service.detail(this.addnotesPlanNo),
            service.qryForCash(params),
            service.qryForPredic(params),
            service.qryForMaintain(params),
            service.qryForRunPlan(params)
        ).subscribe(([detail, cashInfo, predictedInfo, maintainInfo, runPlanInfo]) => {

            this.loading = false;
            console.log(detail);
            // detail
            this.detail = detail.element.addnotesPlan;
            this.detailList = [
                { name: '计划批次', value: this.detail.addnotesPlanNo },
                { name: '所属金库', value: this.detail.clrCenterName },
                { name: '加钞日期', value: this.detail.planAddnotesDate }
            ];
            if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.FIX) {
                const lineList = [];
                this.detail.lineList.forEach(element => {
                    lineList.push(element.lineName);
                });
                this.detail.lineName = lineList.join('、');
                this.detail.lineNameTitle = lineList.join('\r\n');
            }



            //  固定加钞区分线路号；动态加钞区分网点号
            // cashInfo
            // i = 0;
            // if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.FIX) {
            //     cashInfo.retList.forEach(data => {
            //         if (data.lineNo != lastLineNo) {
            //             data.background = this.colorList[i].color;
            //             i = (i + 1) % this.colorList.length;
            //         } else {
            //             data.background = groundColor;
            //         }
            //         data.table = 'cash';
            //         lastLineNo = data.lineNo;
            //         groundColor = data.background;
            //     });
            //     this.cashModel.list = cashInfo.retList;
            this.cashModel.list = this.devSeparate(cashInfo.retList, 'cash');
            //     // predictedInfo
            //     i = 0;
            //     predictedInfo.retList.devOfLine.forEach(data => {
            //         if (data.lineNo != lastLineNo) {
            //             data.background = this.colorList[i].color;
            //             i = (i + 1) % this.colorList.length;
            //         } else {
            //             data.background = groundColor;
            //         }
            //         data.table = 'predict';
            //         data.checked = true;
            //         lastLineNo = data.lineNo;
            //         groundColor = data.background;
            //     });
            //     i = 0;
            //     predictedInfo.retList.devOfOutLine.forEach(data => {
            //         if (data.lineNo != lastLineNo) {
            //             data.background = this.colorList[i].color;
            //             i = (i + 1) % this.colorList.length;
            //         } else {
            //             data.background = groundColor;
            //         }
            //         data.table = 'predict';
            //         lastLineNo = data.lineNo;
            //         groundColor = data.background;
            //     });
            if (predictedInfo.retList.length) {
                const devOfLineList = this.devSeparate(predictedInfo.retList, 'predict');
                devOfLineList.forEach(element => {
                    Object.assign(element, {
                        checked: true,
                    });
                });
                this.predictedModel.list = devOfLineList;

                // this.predictedModel.list = [...devOfLineList, ...(this.devSeparate(predictedInfo.retList.devOfOutLine, 'predict'))];
            }

            //     this.predictedModel.list = [...predictedInfo.retList.devOfLine, ...predictedInfo.retList.devOfOutLine];

            //     // maintainedInfo
            //     i = 0;
            //     maintainInfo.retList.forEach(data => {
            //         if (data.lineNo != lastLineNo) {
            //             data.background = this.colorList[i].color;
            //             i = (i + 1) % this.colorList.length;
            //         } else {
            //             data.background = groundColor;
            //         }
            //         data.table = 'maintain';
            //         lastLineNo = data.lineNo;
            //         groundColor = data.background;
            //     });
            //     this.maintainModel.list = maintainInfo.retList;
            this.maintainModel.list = this.devSeparate(maintainInfo.retList, 'maintain');
            this.runPlanModel.list = this.devSeparate(runPlanInfo.retList, 'runPlan');

            this.moveRight();

            detail.element.detailList.forEach(dev => {
                this.addDev(dev);
            });

            // 总设备数
            const allList = _.map(this.predictedModel.list.concat(this.cashModel.list, this.maintainModel.list, this.runPlanModel.list), 'devNo');
            console.log('总设备', allList, this.totalNums);
            this.totalNums = Array.from(new Set(allList)).length;
        }, (error) => {
            this.loading = false;
            console.log( this.totalNums)
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });

    }

    page = 1;

    list() {
        switch (this.page) {
            case 1:
                return this.predictedModel.list;
            case 2:
                return this.cashModel.list;
            case 3:
                return this.maintainModel.list;
            case 4:
                return this.runPlanModel.list;
        }
        return this.predictedModel.list;
    }

    get model() {
        if (this.page === 1) {
            return this.predictedModel;
        } else if (this.page === 2) {
            return this.cashModel;
        } else if (this.page === 3) {
            return this.maintainModel;
        } else {
            return this.runPlanModel;
        }

    }

    // 右移
    moveRight() {
        this._moveRightForModel(this.predictedModel.list);
        this._moveRightForModel(this.cashModel.list);
        this._moveRightForModel(this.maintainModel.list);
        this._moveRightForModel(this.runPlanModel.list);

        const devNoList = _.map(this.midList, 'devNo');

        this._pushDataToList(this.predictedModel.list, devNoList);
        this._pushDataToList(this.cashModel.list, devNoList);
        this._pushDataToList(this.maintainModel.list, devNoList);
        this._pushDataToList(this.runPlanModel.list, devNoList);
        const allList = _.map(this.predictedModel.list.concat(this.cashModel.list, this.maintainModel.list, this.runPlanModel.list), 'devNo');
        this.totalNums = Array.from(new Set(allList)).length;
        this.predictedModel.list = [...this.predictedModel.list];
        this.cashModel.list = [...this.cashModel.list];
        this.maintainModel.list = [...this.maintainModel.list];
        this.runPlanModel.list = [...this.runPlanModel.list];

        // 深拷贝中间过度数组midList,根据devNo去重,拼接keyEventDetail，显示在右表格
        this.preliminaryModel.list = _.map(JSON.parse(JSON.stringify(this.midList)).groupBy('devNo'), (groupList: Array<any>) => {
            return groupList.reduce((accumulator, currentValue) => {
                accumulator.keyEventDetail += '|' + currentValue.keyEventDetail;
                return accumulator;
            });
        });
        this.preliminaryModel.list = this.devSeparate(this.preliminaryModel.list);
    }

    _moveRightForModel(array) {

        _.remove(array, (item: any) => {
            return !!item.checked;
        }).forEach((item: any) => {
            item.checked = false;
            this.midList = [...this.midList,item];
        });
    }

    _pushDataToList(array, devNoList) {
        _.remove(array, (item: any) => {
            return devNoList.indexOf(item.devNo) !== -1;
        }).forEach((item: any) => {
            item.checked = false;
            this.midList = [...this.midList,item];
        });
    }

    // 左移
    moveLeft() {
        // 取得所有右边数组的devNo集合
        const removeList = _.remove(this.preliminaryModel.list, (item) => {
            return item.checked === true;
        }).map((value) => {
            return value.devNo;
        });
        // const removeList = _.remove(this.preliminaryModel.list).map((value => {
        //     return value.devNo;
        // }));
        // 中间数组中所有devNo满足devNo集合的数据移回左边对应表格
        _.remove(this.midList, (item) => {
            return removeList.indexOf(item.devNo) !== -1;
        }).forEach((item) => {
            if (item.table === 'cash') {
                item.checked = false;
                this.cashModel.addItem(item);
                this.cashModel.list = this.devSeparate(this.cashModel.list);
            } else if (item.table === 'predict') {
                item.checked = false;
                this.predictedModel.addItem(item);
                this.predictedModel.list = this.devSeparate(this.predictedModel.list);
            } else if (item.table === 'maintain') {
                item.checked = false;
                this.maintainModel.addItem(item);
                this.maintainModel.list = this.devSeparate(this.maintainModel.list);
            }else if (item.table === 'runPlan') {
                item.checked = false;
                this.runPlanModel.addItem(item);
                this.runPlanModel.list = this.devSeparate(this.runPlanModel.list);
            }
        });
        this.predictedModel.list = [...this.predictedModel.list];
        this.cashModel.list = [...this.cashModel.list];
        this.maintainModel.list = [...this.maintainModel.list];
        this.runPlanModel.list = [...this.runPlanModel.list];
        const allList = _.map(this.predictedModel.list.concat(this.cashModel.list, this.maintainModel.list, this.runPlanModel.list), 'devNo');
        this.totalNums = Array.from(new Set(allList)).length;
        this.preliminaryModel.list = _.map(JSON.parse(JSON.stringify(this.midList)).groupBy('devNo'), (groupList: Array<any>) => {
            return groupList.reduce((accumulator, currentValue) => {
                accumulator.keyEventDetail += '|' + currentValue.keyEventDetail;
                return accumulator;
            });
        });
        this.preliminaryModel.list = this.devSeparate(this.preliminaryModel.list);
    }

    submit() {
        if (this.preliminaryModel.length === 0) {
            this.message.warning('没有选择任何设备！');
            return;
        }
        this.loading_submit = true;
        const params = { modOpNo: this.session.userId, addnotesPlanNo: this.addnotesPlanNo };
        params['devList'] = [...this.preliminaryModel.list.uniqBy('devNo')];
        console.log(params);

        if( this.detail.status === this.states[0].value ){
            // 未保存过，post提交
            this.service.addnotesPlanDevs(params).subscribe(_data => {
                this.loading_submit = false;
                // this.jumpAtms();
                ++this.service.step;
            }, (error) => {
                this.loading_submit = false;
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
        }else{
            // 已保存过，put修改
            this.service.modAddnotesPlanDevs(params).subscribe(_data => {
                this.loading_submit = false;
                // this.jumpAtms();
                ++this.service.step;
            }, (error) => {
                this.loading_submit = false;
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
        }

    }

    toggleRowAdd() {
        this.rowAdding = !this.rowAdding;
        if (this.rowAdding) {
            this.addData = {};
            this.qryAllDevInfo();
        }
    }

    // 查询所有设备
    qryAllDevInfo() {
        this.service.qryAllDevInfo({
            clrCenterNo: this.detail.clrCenterNo
        }).subscribe(_data => {
            this.allDevList = _data.retList;
        }, (error) => {
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    addDevNo = [];
    // 下拉框选择查询显示设备详情
    finDev(devNo) {
        if (devNo.length == 0)
            return;
        const target = this.allDevList.find((value) => {
            return value.no === devNo[0];
        });

        if (target) {
            this.rowSelected = true;
            this.addData.devNo = target.no;
            this.addData.devCatalogName = target.typeName;
            this.addData.orgName = target.orgName;
            this.addData.keyEventDetail = '——';
            this.addDev(this.addData);
            this.addData = {};
            setTimeout(() => this.addDevNo = [], 0);
        } else {
            this.rowSelected = false;
        }
    }

    // 点击确认
    confirm() {
        this.addDev(this.addData);
        this.rowAdding = false;
    }

    addDev(addData) {
        const removeList = [];

        _.remove(this.cashModel.list, value => {
            return value.devNo === addData.devNo;
        }).forEach(value => {
            value.checked = false;
            removeList.push(value);
            console.log('removelist',removeList,value);
        });

        _.remove(this.predictedModel.list, value => {
            return value.devNo === addData.devNo;
        }).forEach(value => {
            value.checked = false;
            removeList.push(value);
        });

        _.remove(this.maintainModel.list, value => {
            return value.devNo === addData.devNo;
        }).forEach(value => {
            value.checked = false;
            removeList.push(value);
        });

        _.remove(this.runPlanModel.list, value => {
            return value.devNo === addData.devNo;
        }).forEach(value => {
            value.checked = false;
            removeList.push(value);
        });

        // 把左边表格符合的数据放入中间整合数组中
        this.midList.unshift(...removeList);

        const midDataFlay = this.midList.some(value => {
            return value.devNo === addData.devNo;
        });

        // 新加设备数据不在现所有表格中，新加一条设备数据
        if (removeList.length === 0 && !midDataFlay) {
            addData['newData'] = true;
            this.midList.unshift(addData);
        }
        // 深拷贝中间过度数组midList,根据devNo去重,拼接keyEventDetail，显示在右表格
        this.preliminaryModel.list = _.map(JSON.parse(JSON.stringify(this.midList)).groupBy('devNo'), (groupList: Array<any>) => {
            return groupList.reduce((accumulator, currentValue) => {
                accumulator.keyEventDetail += '|' + currentValue.keyEventDetail;
                return accumulator;
            });
        });
        this.preliminaryModel.list = this.devSeparate(this.preliminaryModel.list);

    }

    findDataToRight(dataList) {
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i]['devNo'] === this.addData['devNo']) {
                const data = dataList.splice(i, 1)[0];
                data.checked = false;
                this.preliminaryModel.addItem(data);
            }
        }
    }

    // 删除右表格新增设备数据
    deleteNewData(devNo) {
        _.remove(this.midList, value => devNo === value.devNo);
        _.remove(this.preliminaryModel.list, (value) => {
            return devNo === value.devNo;
        });
        this.preliminaryModel.list = [...this.preliminaryModel.list];
    }

    moveDataInit(data, dataSource) {
        Object.assign(data, {
            checked: true,
        });
        if(dataSource === 'right') {
            this.moveLeft();
        }else if (dataSource === 'left') {
            this.moveRight();
        }
    }
}
