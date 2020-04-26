import {Component, OnInit} from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { Page } from '../../../../models/page';
import { AppService } from 'app/app.service';
import { NetpointLineArrangeService } from './netpoint-line-arrange.service';
import { NetpointLineArrangeGenerateComponent } from './netpoint-line-arrange-generate/netpoint-line-arrange-generate.component';
import { NetpointLineArrangeDayModComponent } from './netpoint-line-arrange-day-mod/netpoint-line-arrange-day-mod.component';
import { NetpointLineArrangeDayDetailComponent } from './netpoint-line-arrange-day-detail/netpoint-line-arrange-day-detail.component';
@Component({
    templateUrl: './netpoint-line-arrange.html'
})
export class NetpointLineArrangeComponent implements OnInit{

    loading = false;
    expandForm = false;
    dataSet = [];
    page = new Page();
    formModel = [];
    lineList;
    lineRunMapDetailInfoList;
    nextMonthDay = new Date();

    constructor(private modal: NzModalService,
        private message: NzMessageService,
        private appService: AppService,
        private service: NetpointLineArrangeService,
    ) {
    }

    ngOnInit() {
        this.formModel['startMonth'] = null;
        this.formModel['endMonth'] = null;
    }

    search() {
        this.refreshData(true);
    }

    reset() {
        _.extend(this.formModel, {
            lineNo: null,
            clrCenterNo: null,
            startMonth: null,
            endMonth: null
        });
        this.refreshData();
    }

    getLineList(value: string): void  {
        const params = { clrCenterNo: value };
        this.service.qryAllLine(params)
            .subscribe(_data => {
                this.lineList = _data.retList;
            });
    }

    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
        }
        this.loading = true;
        const params = {
            clrCenterNo: this.formModel['clrCenterNo'],
            networkLineNo: this.formModel['lineNo'] || '',
            startMonth: this.formatDay(this.formModel['startMonth']) || '',
            endMonth: this.formatDay(this.formModel['endMonth'])|| '',
            pageSize: this.page.pageSize,
            curPage: this.page.curPage,
            totalRow: this.page.totalRow,
            totalPage: this.page.totalPage,
        };

        this.service.qryNetworkRunMapByPage(params)
            .subscribe(_data => {
                this.dataSet = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.loading = false;
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    openGenerate() {
        const nzModalSubject = this.modal.create({
            nzTitle: '生成网点线路排班',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: NetpointLineArrangeGenerateComponent,
            nzOnOk: () => {
                this.refreshData(false);
            },
            nzOnCancel: () => {
            },
        });
    }

    mod(lineRunMapInfo) {
        const nzModalSubject = this.modal.create({
            nzTitle: '修改网点线路排班',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: NetpointLineArrangeDayModComponent,
            nzWidth: '60%',
            nzZIndex: 998,
            nzComponentParams: {
                theYearMonth: lineRunMapInfo.theYearMonth,
                networkLineNo: lineRunMapInfo.lineNo
            },
            nzOnOk: () => {
                this.refreshData(false);
            },
            nzOnCancel: () => {
            },
        });
    }

    openDayDetail(lineRunMapInfo) {
        const nzModalSubject = this.modal.create({
            nzTitle: '网点线路排班详细信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: NetpointLineArrangeDayDetailComponent,
            nzWidth: '90%',
            nzComponentParams: {
                theYearMonth: lineRunMapInfo.theYearMonth,
                networkLineNo: lineRunMapInfo.lineNo
            },
            nzOnOk: () => {
            },
            nzOnCancel: () => {
            },
        });
    }

    curClrCenterNo;
    getClrCenterNo(value) {
        if (!this.curClrCenterNo) {
            this.curClrCenterNo = value;
            this.refreshData(true);
        }
    }

    //时间转换
    formatDay(date) {
        if (date == null) {
            return null;
        }
        const cDay = date.getFullYear() + '-' +
            (date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
        return cDay;
    }

    _startValueChange = () => {
        if (this.formModel['startMonth'] > this.formModel['endMonth']) {
            this.formModel['endMonth'] = null;
        }
    };

    _endValueChange = () => {
        if (this.formModel['startMonth'] > this.formModel['endMonth'] && this.formModel['endMonth'] != null) {
            this.formModel['startMonth'] = null;
        }
    };
    //
    _disabledStartDate = (startValue) => {
        if (!startValue || !this.formModel['endMonth']) {
            return false;
        }
        return startValue.getTime() > this.formModel['endMonth'].getTime();
    };

    _disabledEndDate = (endValue) => {
        if (!endValue || !this.formModel['startMonth']) {
            return false;
        }
        return endValue.getMonth() <= this.formModel['startMonth'].getMonth() - 1;
    };
}
