import { Component , OnInit} from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { Page } from '../../../../models/page';
import { AppService } from 'app/app.service';
import { ATMLineArrangeService } from './atm-line-arrange.service';
import { ATMLineArrangeGenerateComponent } from './ATM-line-arrange-generate/atm-line-arrange-generate.component';
import { ATMLineArrangeDayModComponent } from './ATM-line-arrange-day-mod/atm-line-arrange-day-mod.component';
import { ATMLineArrangeDayDetailComponent } from './ATM-line-arrange-day-detail/atm-line-arrange-day-detail.component';

@Component({
    templateUrl: './atm-line-arrange.html'
})
export class ATMLineArrangeComponent implements OnInit {

    loading = false;
    expandForm = false;
    dataSet = [];
    page = new Page();
    formModel = [];
    clrCenterList = [];
    lineList;
    lineRunMapDetailInfoList;
    nextMonthDay = new Date();
    curClrCenterNo;

    constructor(private modal: NzModalService,
        private message: NzMessageService,
        private appService: AppService,
        private session: SessionService,
        private service: ATMLineArrangeService,
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
        this.refreshData(true);
    }

    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
        }
        this.loading = true;
        const params = {
            clrCenterNo: this.formModel['clrCenterNo'] || null,
            lineNo: this.formModel['lineNo'] || null,
            startMonth: this.formatDay(this.formModel['startMonth']),
            endMonth: this.formatDay(this.formModel['endMonth']),
            type: 1,//运行图类型 1：设备；2：网点
            pageSize: this.page.pageSize,
            curPage: this.page.curPage,
            totalRow: this.page.totalRow,
            totalPage: this.page.totalPage,
        };
        this.service.qryRunMapByPage(params)
            .subscribe(_data => {
                this.dataSet = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.page.totalPage = _data['totalPage'];
                this.loading = false;
            }, (error) => {
                this.loading = false;
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    openGenerate() {
        const nzModalSubject = this.modal.create({
            nzTitle: '生成ATM线路排班',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: ATMLineArrangeGenerateComponent,
            nzOnOk: () => {
                this.refreshData(false);
            },
            nzOnCancel: () => {
            },
        });
    }

    mod(lineRunMapInfo) {
        const nzModalSubject = this.modal.create({
            nzTitle: `修改ATM线路排班[${lineRunMapInfo.lineName}]`,
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: ATMLineArrangeDayModComponent,
            nzWidth: '90%',
            nzZIndex: 998,
            nzComponentParams: {
                theYearMonth: lineRunMapInfo.theYearMonth,
                lineNo: lineRunMapInfo.lineNo
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
            nzTitle: `ATM线路排班详细信息[${lineRunMapInfo.lineName}]`,
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: ATMLineArrangeDayDetailComponent,
            nzWidth: '90%',
            nzComponentParams: {
                theYearMonth: lineRunMapInfo.theYearMonth,
                lineNo: lineRunMapInfo.lineNo
            },
            nzOnOk: () => {
            },
            nzOnCancel: () => {
            },
        });
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
        if (this.formModel['startMonth'] > this.formModel['endMonth']) {
            this.formModel['startMonth'] = null;
        }
    };
    
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
        return endValue.getTime() < this.formModel['startMonth'].getTime()-1000*60*60*24*31;
    };

    getClrCenterNo(value) {
        if (!this.curClrCenterNo) {
            this.curClrCenterNo = value;
            this.refreshData(true);
        }
    }
}
