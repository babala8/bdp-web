import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Page } from '../../../../models/page';
import { ChannelCenterService } from '../../channel-center.service';
import { DevManageAddComponent } from './add/dev-manage-add.component';
import { DevManageModifyComponent } from './mod/dev-manage-modify.component';
import { DevManageDetailComponent } from './detail/dev-manage-detail.component';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { SYS_CONS } from '../../../../models/constant';
import { DevManageReviseComponent } from './revise/dev-manage-revise.component';

@Component({
    templateUrl: './dev-manage.html',
    styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class DevManageComponent implements OnInit {
    dataList = [];
    formModel = {};
    loading = true;
    page = new Page();
    devTypes = [];
    devVendors = [];
    devCatalogs = [];
    expandForm = false;
    devTypeCashs = SYS_CONS.DEV_TYPE_CASH;
    curOrg = {
        no: this.session.orgNo,
        name: this.session.orgName,
        orgType: this.session.userInfo.sysOrg.no
    };

    constructor(private nzModal: NzModalService,
                private message: NzMessageService,
                private service: ChannelCenterService,
                private session: SessionService
                ) {
    }

    ngOnInit(): void {
        this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
        this.refreshData(true);
        const params = {};
        this.service.getDevVenders(params)
            .subscribe(data => {
                if (data['retCode'] === '00') {
                    this.devVendors = data['retList'];
                }
            });
        this.service.getDevCatalogs(params)
            .subscribe(data => {
                if (data['retCode'] === '00') {
                    this.devCatalogs = data['retList'];
                }
            });
        this.service.getDevTypes(params)
            .subscribe(data => {
                if (data['retCode'] === '00') {
                    this.devTypes = data['retList'];
                }
            });
    }

    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
        }
        const params = {
            no: this.formModel['no'] || '',
            address: this.formModel['address'] || '',
            orgNo: this.formModel['org'].no || '',
            devVendor: this.formModel['devVendor'] || '',
            devCatalog: this.formModel['devCatalog'] || '',
            devType: this.formModel['devType'] || '',
            ip: this.formModel['ip'] || '',
            devTypeCash: this.formModel['devTypeCash'] || '',
            clrCenterNo: this.formModel['clrCenterNo'] || '',
            addnotesLine: this.formModel['lineNo'] || '',
            curPage: this.page.curPage,
            pageSize: this.page.pageSize,
            totalPage: this.page.totalPage || '',
            totalRow: this.page.totalRow || '',
        };
        this.loading = true;
        this.service.getDevInfos(params)
            .subscribe(_data => {
                console.log(_data);
                this.dataList = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.page.totalPage = _data['totalPage'];
                this.loading = false;
                console.log(this.page)
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    search() {
        this.refreshData(true);
    }

    confirmDel(no) {
        this.service.delDev(no)
            .subscribe(data => {
                this.message.success('删除成功！');
                this.refreshData(true);
            }, (error) => {
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    openAdd() {
        const addModal = this.nzModal.create({
            nzTitle: '添加设备信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzWidth: '80%',
            nzZIndex: 990,
            nzContent: DevManageAddComponent,
            nzOnOk: () => {
                this.refreshData(true);
            },
            nzOnCancel: () => {
            },
        });
    }

    openModify(item) {
        const modifyModal = this.nzModal.create({
            nzTitle: '修改设备信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzWidth: '80%',
            nzZIndex: 990,
            nzContent: DevManageModifyComponent,
            nzComponentParams: {
                devInfo: item
            },
            nzOnOk: () => {
                this.refreshData(true);
            },
            nzOnCancel: () => {
            },
        });
    }

    openDetail(item) {
        const detailModal = this.nzModal.create({
            nzTitle: '设备信息详情',
            nzFooter: null,
            nzWidth: '80%',
            nzContent: DevManageDetailComponent,
            nzComponentParams: {
                devInfo: item
            },
            nzOnOk: () => {
                this.refreshData(false);
            },
            nzOnCancel: () => {
            },
        })
    }

  modCircle(item) {
    const reviseModal = this.nzModal.create({
      nzTitle: '设备加钞周期调整',
      nzFooter: null,
      nzWidth: '80%',
      nzContent: DevManageReviseComponent,
      nzComponentParams: {
        devInfo: item
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(reviseModal);
  }
    practice(item) {
        console.log(item);
        const params = {
            devNo: item.no,
            flag: item.cycleFlag,
            period: item.addClrPeriod
        };
        this.service.practice(params)
            .subscribe(
                data => {
                    this.message.success(data.retMsg);
                },
                err => {
                    this.message.error(err.body.retMsg);
                }
            );
    }


}
