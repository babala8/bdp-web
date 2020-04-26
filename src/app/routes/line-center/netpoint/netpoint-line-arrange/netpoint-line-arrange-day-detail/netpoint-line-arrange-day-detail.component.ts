import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { AppService } from 'app/app.service';
import { NetpointLineArrangeService } from '../netpoint-line-arrange.service';
import { NetpointLineArrangeOrgDetailComponent } from '../netpoint-line-arrange-org-detail/netpoint-line-arrange-org-detail.component';

@Component({
    templateUrl: './netpoint-line-arrange-day-detail.html'
})
export class NetpointLineArrangeDayDetailComponent implements OnInit {
    loading = false;
    lineRunMapDetailInfoList = [];
    theYearMonth;
    networkLineNo;
    orgCount;
    orgList;

    constructor(private fb: FormBuilder,
        private appService: AppService,
        private service: NetpointLineArrangeService,
        private nzModal: NzModalRef,
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

    openRunMapOrgDetail(lineRunMapDetailInfo, lineWorkId) {
        const nzModalSubject = this.modal.create({
            nzTitle: '网点线路运行图设备详细信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: NetpointLineArrangeOrgDetailComponent,
            nzWidth: '90%',
            nzZIndex: 1001,
            nzComponentParams: {
                lineRunMapDetail: lineRunMapDetailInfo,
                lineWorkId: lineWorkId
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
        }, (error) => {
            this.loading = false;
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

}

