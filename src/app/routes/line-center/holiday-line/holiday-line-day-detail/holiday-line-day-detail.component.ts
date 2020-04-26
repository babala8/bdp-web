import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { AppService } from '../../../../app.service';
import { HolidayLineService } from '../holiday-line.service';
import { HolidayLineOrgDetailComponent } from '../holiday-line-org-detail/holiday-line-org-detail.component';

@Component({
    templateUrl: './holiday-line-day-detail.html'
})
export class HolidayLineDayDetailComponent implements OnInit {
    loading = false;
    lineRunMapDetailInfoList = [];
    theYearMonth;
    networkLineNo;
    orgCount;
    orgList;
    constructor(private fb: FormBuilder,
        private appService: AppService,
        private service: HolidayLineService,
        private session: SessionService,
        private message: NzMessageService,
        private modal: NzModalService, ) {
    }

    ngOnInit() {
        this.refreshData();
    }

    dataProcess() {
        this.lineRunMapDetailInfoList.forEach(data => {
            this.orgCount = 0;
            this.orgList = [];
            data.detailList.forEach(network => {
                this.orgCount += 1;
                this.orgList.push(network.customerNo);
            })
            data.orgList = this.orgList.join(',');
            data.orgMultiLine = this.orgList.join('\r\n');
            data.networkCount = this.orgCount;
        });
    }

    openRunMapOrgDetail(lineRunMapDetailInfo) {
        console.log(lineRunMapDetailInfo);
        const nzModalSubject = this.modal.create({
            nzTitle: '网点线路运行图设备详细信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: HolidayLineOrgDetailComponent,
            nzWidth: '90%',
            nzZIndex: 1001,
            nzComponentParams: {
                lineRunMapDetail: lineRunMapDetailInfo,
            },
        });
    }

    refreshData() {
        this.loading = true;
        this.service.qryNetworkLineRunMapDetail({
            networkLineNo: this.networkLineNo,
            theYearMonth: this.theYearMonth,
        }).subscribe(_data => {
            this.loading = false;
            this.lineRunMapDetailInfoList = _data['element'];
            this.dataProcess();
            console.log(this.lineRunMapDetailInfoList);
        }, (error) => {
            this.loading = false;
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

}

