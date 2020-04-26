import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { AppService } from '../../../app.service';
import { Page } from '../../../models/page';
import { SYS_CONS } from '../../../models/constant';
import { VaultChangeNumComponent } from './component/vault-changeNum.component';
import { GeneralManagementService } from "../general-management.service";

@Component({
    templateUrl: './vault.html',
})
export class VaultComponent implements OnInit {
    formModel = {};
    dataList = [];
    loading = true;
    page = new Page();

    centerTypes = SYS_CONS.CENTER_TYPES;

    constructor(
        private appService: AppService,
        private vaultService: GeneralManagementService,
        private modal: NzModalService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        this.refreshData(true);
    }

    refreshData(reset = false) {
      if (reset) {
        this.page.curPage = 1;
      }
        this.loading = true;
        const params = {
            clrCenterNo: this.formModel['clrCenterNo'] || '',
            clrCenterName: this.formModel['clrCenterName'] || '',
        };

        // 获取当前页
        this.vaultService.getAllClrCenterInfos(params)
            .subscribe(_data => {
                this.dataList = _data['retList'];
                this.loading = false;
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

    changeNum(item){
        console.log(item);
        const modal = this.modal.create({
            nzTitle: '调整参数',
            nzMaskClosable: false,
            nzFooter: null,
            nzZIndex: 990,
            nzWidth: '80%',
            nzContent: VaultChangeNumComponent,
            nzComponentParams: {
                data: item
            },
            nzOnOk: () => {
                this.refreshData(false);
            },
            nzOnCancel: () => {
            },
        });
    }

    // openDetail(vault) {
    //     const modal = this.modal.create({
    //         nzTitle: '金库详情',
    //         nzMaskClosable: false,
    //         nzFooter: null,
    //         nzContent: VaultDetailComponent,
    //         nzWidth: '80%',
    //         nzComponentParams: {
    //             vault: vault
    //         },
    //         nzOnOk: () => {
    //             this.refreshData(false);
    //         },
    //         nzOnCancel: () => {
    //         },
    //     });
    //
    // }

    // openOrgDetail(org) {
    //     const modal = this.modal.create({
    //         nzTitle: '机构详情',
    //         nzMaskClosable: false,
    //         nzFooter: null,
    //         nzContent: OrgDetailComponent,
    //         nzComponentParams: {
    //             org: org
    //         },
    //         nzOnOk: () => {
    //         },
    //         nzOnCancel: () => {
    //         },
    //     });
    // }


    // associateOrgs(vault) {
    //     const modal = this.modal.create({
    //         nzTitle: '关联机构',
    //         nzMaskClosable: false,
    //         nzFooter: null,
    //         nzWidth: '80%',
    //         nzContent: VaultAssociateOrgsComponent,
    //         nzComponentParams: {
    //             vault: vault
    //         },
    //         nzOnOk: () => {
    //             this.refreshData(true);
    //         },
    //         nzOnCancel: () => {
    //         },
    //     });
    // }

}
