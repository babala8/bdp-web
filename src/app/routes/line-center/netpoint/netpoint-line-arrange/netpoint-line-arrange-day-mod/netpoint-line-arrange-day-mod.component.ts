import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { AppService } from 'app/app.service';
import { NetpointLineArrangeService } from '../netpoint-line-arrange.service';
import { NetpointLineArrangeModComponent } from '../netpoint-line-arrange-mod/netpoint-line-arrange-mod.component';

@Component({
    templateUrl: './netpoint-line-arrange-day-mod.html'
})
export class NetpointLineArrangeDayModComponent implements OnInit {
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

    openRunMapOrgMod(lineRunMapDetailInfo) {
        const nzModalSubject = this.modal.create({
            nzTitle: '修改网点线路排班',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: NetpointLineArrangeModComponent,
            nzWidth: '90%',
            nzZIndex: 1000,
            nzComponentParams: {
                lineRunMapDetail: lineRunMapDetailInfo,
            },
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {
            },
        });
    }

    refreshData() {
        this.loading = true;
        this.service.qryNetworkLineRunMapDetail({
            networkLineNo: this.networkLineNo,
            theYearMonth: this.theYearMonth
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

