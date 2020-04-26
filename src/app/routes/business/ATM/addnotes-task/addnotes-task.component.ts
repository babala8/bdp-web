import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { XlsxService } from '@delon/abc';
import * as _ from 'lodash';
import * as add_days from 'date-fns/add_days';

import { GroupMapComponent } from './../addnotes-plan/add/fix-group-tsp/group-map/group-map.component';
import { Page } from '../../../../models/page';
import { SYS_CONS } from '../../../../models/constant';
import { AppService } from 'app/app.service';
import { SessionService } from '@core';
import { AddnotesTaskService } from './addnotes-task.service';
import { AddnotesTaskDetailComponent } from './addnotes-task-detail/addnotes-task-detail.component';
import { AddnotesTaskProcessComponent } from './addnotes-task-process/addnotes-task-process.component';
import { AddnotesTaskAssignToComponent } from './addnotes-task-assignTo/addnotes-task-assignTo.component';
import { ATMLineManageService } from 'app/routes/line-center/ATM/ATM-line-manage/atm-line-manage.service';

@Component({
    templateUrl: 'addnotes-task.html',
})

export class AddnotesTaskComponent implements OnInit {

    formModel = {};
    lines = [];
    loading = true;
    dataSet = [];
    startTime;
    endTime;
    page = new Page();
    PAGESIZE_SELECTOR = SYS_CONS.PAGESIZE_SELECTOR;
    states = SYS_CONS.STATE.ADDNOTE_TASK;
    expandForm = false;

    constructor(private modal: NzModalService,
        private ATMService: ATMLineManageService,
        private appService: AppService,
        private message: NzMessageService,
        private session: SessionService,
        private service: AddnotesTaskService,
        private xlsx: XlsxService) {
    }

    ngOnInit() {
        this.reset();
        this.qryAllLine();
    }

    openDetail(data) {
        const window = this.modal.create({
            nzTitle: '加钞任务单详情',
            nzWidth: '98%',
            nzFooter: null,
            nzContent: AddnotesTaskDetailComponent,
            nzComponentParams: {
                data: data
            },
            nzOnOk: () => {
                // 【成功时】，刷新数据，并回到第一页
            },
            nzOnCancel: () => {
                // 一般情况，【取消时】，什么都不做
            },
        });
    }

    qryAllLine() {
        this.ATMService.qryAllLine({ clrCenterNo: '' })
            .subscribe(_data => {
                this.lines = _data.retList;
            }, (error) => {
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
            this.selectItem = [];
        }

        const params = _.extend({}, this.formModel, this.page, {
          clrCenterNo: this.formModel['clrCenterNo'] ? this.formModel['clrCenterNo'] : '',
          lineNo: this.formModel['lineNo'] ? this.formModel['lineNo'] : '',
          taskNo: this.formModel['taskNo'] ? this.formModel['taskNo'] : '',
          addnotesPlanNo: this.formModel['addnotesPlanNo'] ? this.formModel['addnotesPlanNo'] : '',
          status: this.formModel['status'] ? this.formModel['status'] : '',
          startDate: this.formModel['startDate'] ? this.formModel['startDate'].format() : '',
          endDate: this.formModel['endDate'] ? this.formModel['endDate'].format() : '',
          taskType: '1'
        });

        this.loading = true;
        this.service.dispatchQry(params)
            .subscribe(_data => {
                this.loading = false;
                this.dataSet = _data.retList;
                this.dataSet.forEach(dispatch => {
                    if (_.filter(this.selectItem, { dispatchNo: dispatch.dispatchNo }).length > 0) {
                        dispatch.checked = true;
                    }
                    if (dispatch.lineName == null) {
                        dispatch.lineName = '临时线路' + dispatch.lineNo.substring(dispatch.lineNo.length - 2);
                    }
                    if (dispatch.status === SYS_CONS.STATE.ADDNOTE_TASK[1].value) {
                        dispatch.background = '#A9A9A9';
                    }
                });
                this._refreshStatus();
                this.page.totalRow = _data['totalRow'];
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    reset() {
        this.formModel['startDate'] = new Date();
        this.formModel['endDate'] = add_days(new Date(), 7);
        this.formModel['taskNo'] = null;
        this.formModel['addnotesPlanNo'] = null;
        this.formModel['clrCenterNo'] = null;
        this.formModel['lineNo'] = null;
        this.formModel['status'] = null;
        this.refreshData(true);
    }

    changeItem(event, data) {
        const hasElement = _.filter(this.selectItem, { dispatchNo: data.dispatchNo }).length > 0;
        if (!hasElement && event) {
            this.selectItem.push(data);
        } else if (hasElement && !event) {
            _.pullAllBy(this.selectItem, [{ 'dispatchNo': data.dispatchNo }], 'dispatchNo');
        }
    }

    cancel(dispatchNo) {
        this.service.cancel(dispatchNo)
            .subscribe(_data => {
                this.message.success('取消成功！');
                this.refreshData(true);
            }, (error) => {
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    _allChecked = false;
    _operating = false;
    _indeterminate = false;
    selectItem: Array<any> = [];

    _refreshStatus() {
        const allChecked = this.dataSet.every(value => value.checked === true);
        const allUnChecked = this.dataSet.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }

    _checkAll(value) {
        this.dataSet.forEach(data => { data.checked = value, this.changeItem(value, data); });
        this._refreshStatus();
    }

    export() {
        this._operating = true;
        const noArr = [], _that = this;
        this.selectItem.forEach(element => {
            noArr.push(element.taskNo);
        });

        this.service.export({ 'noArr': noArr + '' }).subscribe(
            result => {
                const columns = [
                    { title: '线路号', index: 'lineName' },
                    { title: 'ATM终端号', index: 'customerNo' },
                    { title: '加钞模式', index: 'mode', value: '更换钞箱' },
                    { title: '计划加钞金额（元）', index: 'addnotesAmount' },
                    { title: '开锁人员A', index: 'opNo1', value: '' },
                    { title: '开锁人员B', index: 'opNo2', value: '' },
                    { title: '加钞日期', index: 'planFinishDate' }
                ];
                const data = [['批量加钞计划表', null, null, null], columns.map(i => i.title)];
                result.element.taskList.forEach(i =>
                    data.push(columns.map(c => {
                        if (c.index === 'addnotesAmount') {
                            console.log(new CurrencyPipe('zh-Hans').transform(i[c.index as string], 'CNY', 'symbol-narrow'));
                            return new CurrencyPipe('zh-Hans').transform(i[c.index as string], 'CNY', 'symbol-narrow');
                        } else if (c.index === 'mode') {
                            return '更换钞箱';
                        } else if (c.index === 'opNo1' || c.index === 'opNo2') {
                            return '';
                        } else if (c.index === 'lineName') {
                            if (i[c.index as string] == null) {
                                return i['addnotesGroupNo'];
                            } else {
                                return i[c.index as string].substring(0, 3);
                            }
                        } else {
                            return i[c.index as string];
                        }

                    })),
                    console.log(data)
                );
                const dispatchNo = result.element.addnotesPlanNos;
                this.xlsx.export({
                    sheets: [
                        {
                            data: data,
                            name: '加钞任务单明细',
                            merges: [
                                // 设置A1-G1的单元格合并
                                { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }
                            ]
                        },
                    ],
                    filename: dispatchNo + '.xlsx'
                }).then(() => {
                    _that._operating = false;
                },
                    error => {
                        _that._operating = false;
                        _that.message.error('文件导出异常');
                    }
                );
            },
            error => {
                this._operating = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            }
        );
    }

    openProcessInfo(data) {
        const ProcessModal = this.modal.create({
            nzTitle: `任务单进度`,
            nzWidth: '95%',
            nzContent: AddnotesTaskProcessComponent,
            nzComponentParams: {
                data: data
            },
            nzZIndex: 99,
            nzFooter: null,
            nzOnCancel: () => this.refreshData()
        });
    }

    mapRouter(data) {
        console.log('line', data);
        const GroupMapModal = this.modal.create({
            nzTitle: `加钞线路图[${data.taskNo}]`,
            nzWidth: '95%',
            nzContent: GroupMapComponent,
            nzComponentParams: {
                addnotesPlanNo: data.addnotesPlanNo,
                groupNo: `${data.lineNo}`
            },
            nzFooter: null
        });
    }

    _startValueChange = () => {
        if (this.formModel['startDate'] > this.formModel['endDate']) {
            this.formModel['endDate'] = null;
        }
    }

    _endValueChange = () => {
        if (this.formModel['startDate'] > this.formModel['endDate']) {
            this.formModel['startDate'] = null;
        }
    }

    _disabledStartDate = (startValue) => {
        if (!startValue || !this.formModel['endDate']) {
            return false;
        }
        return startValue.getTime() > this.formModel['endDate'].getTime();
    }

    _disabledEndDate = (endValue) => {
        if (!endValue || !this.formModel['startDate']) {
            return false;
        }
        return endValue.getTime() < this.formModel['startDate'].getTime();
    }


    openAssignTo(data) {
        const window = this.modal.create({
            nzTitle: '分配人员',
            nzWidth: '50%',
            nzFooter: null,
            nzContent: AddnotesTaskAssignToComponent,
            nzComponentParams: {
                dispatch: data
            },
            nzOnOk: () => {
                // 【成功时】，刷新数据，并回到第一页
                this.refreshData(true);
            },
            nzOnCancel: () => {
                // 一般情况，【取消时】，什么都不做
            },
        });


    }
}
