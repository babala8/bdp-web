import {Component, OnInit} from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../../../../models/page';
import { AppService } from 'app/app.service';
import { NetpointLineManageService } from './netpoint-line-manage.service';
import { NetpointLineManageAddAddComponent } from './netpoint-line-manage-add/netpoint-line-manage-add.component';
import { NetpointLineManageModComponent } from './netpoint-line-manage-mod/netpoint-line-manage-mod.component';
import { NetpointLineManageDetailComponent } from './netpoint-line-manage-detail/netpoint-line-manage-detail.component';

@Component({
    templateUrl: './netpoint-line-manage.html'
})
export class NetpointLineManageComponent implements OnInit {

    loading = false;
    expandForm = false;
    dataSet = [];
    page = new Page();
    formModel = {};
    lineDetailInfoList;
    lineList;

    constructor(
        private modal: NzModalService,
        private message: NzMessageService,
        private appService: AppService,
        private service: NetpointLineManageService,
    ) { }

    ngOnInit() { }


    search() {
        this.refreshData(true);
    }

    reset() {
        this.formModel = {
            clrCenterNo: this.clrCenterNo,
            lineNo: null
        };
        this.refreshData(true);
    }

    clrCenterNo;
    getLineList(value: string): void  {
        const params = { clrCenterNo: value };
        this.service.qryAllLine(params)
            .subscribe(_data => {
                this.lineList = _data.retList;
            });
            if(!this.clrCenterNo) {
                this.clrCenterNo = value;
                this.reset();
            }
    }


    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
        }
        this.loading = true;
        const params = {
            clrCenterNo: this.formModel['clrCenterNo'],
            lineName: this.formModel['lineName'] ? this.formModel['lineName'] : '',
            lineType: '1',
            pageSize: this.page.pageSize,
            curPage: this.page.curPage,
            totalRow: this.page.totalRow,
            totalPage: this.page.totalPage,
        };

        this.service.qryLinesByPage(params)
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

    openAdd() {
        const nzModalSubject = this.modal.create({
            nzTitle: '添加新线路信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: NetpointLineManageAddAddComponent,
            nzOnOk: () => {
                this.refreshData(false);
            },
            nzOnCancel: () => {
            },
        });
    }

    mod(lineInfo) {
        const nzModalSubject = this.modal.create({
            nzTitle: '修改线路信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: NetpointLineManageModComponent,
            nzComponentParams: {
                lineInfo: lineInfo,
            },
            nzOnOk: () => {
                this.refreshData(false);
            },
            nzOnCancel: () => {
            },
        });
    }


    confirmDel(lineInfo) {
        this.service.lineDel(lineInfo).subscribe(data => {
            this.message.success('删除线路信息成功');
            this.refreshData(false);
        }, (error) => {
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    qryDetail(lineInfo, type) {
        this.service.qryLinesDetail(lineInfo.lineNo).subscribe(_data => {
            this.lineDetailInfoList = _data['retList'];
            if (type === 1) {
                this.openDetail();
            }else if (type === 2) {
                this.mod(lineInfo);
            }
        }, (error) => {
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    openDetail() {
        const nzModalSubject = this.modal.create({
            nzTitle: '线路详细信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: NetpointLineManageDetailComponent,
            nzWidth: '90%',
            nzComponentParams: {
                lineDetailInfoList: this.lineDetailInfoList
            },
            nzOnOk: () => {
                this.refreshData(false);
            },
            nzOnCancel: () => {
            },
        });
    }

    cancel() {

    }
}
