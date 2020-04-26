import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import {DevCompanyAddComponent} from './add/devCompany-add.component';
import {DevCompanyDetailComponent} from './detail/devCompany-detail.component';
import {DevCompanyModifyComponent} from './mod/devCompany-modify.component';
import {ServiceProviderService} from "../service-provider.service";
import {Page} from "../../../../models/page";
import { ServiceProvider } from '../../../../models/constant';

@Component({
  selector: 'app-dev-company',
  templateUrl: './dev-company.component.html',
})
export class DevCompanyComponent implements OnInit {
  dataList = [];
  formModel = {};
  loading = false;
  page = new Page();
  providerType = ServiceProvider.PROVIDER_TYPE;
  constructor(private nzModal: NzModalService,
              private devCompanyService: ServiceProviderService,
              private message: NzMessageService) {

  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    const params = {
        name : this.formModel['companyName'] || '',
        type : this.providerType.devProvider,
        curPage: this.page.curPage,
        pageSize: this.page.pageSize,
        totalPage: this.page.totalPage || '',
        totalRow: this.page.totalRow || '',
    };

    this.devCompanyService.getDevCompanys(params)
        .subscribe( _data => {
          console.log(_data);
          this.dataList = _data['retList'];
          this.page.totalRow = _data['totalRow'];
          this.page.totalPage = _data['totalPage'];
          this.loading = false;
          console.log(this.page)
        }, (error) => {
          console.log(error);
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });
  }

  search() {
    this.refreshData();
  }

  openAdd() {
    const modal = this.nzModal.create({
      nzTitle: '添加设备维护商',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '50%',
      nzContent: DevCompanyAddComponent,
      nzOnOk: () => {
        this.refreshData();
      },
      nzOnCancel: () => {
      },
    });
  }

  openModify(item) {
    const modal = this.nzModal.create({
      nzTitle: '修改设备维护商',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '50%',
      nzComponentParams: {
        devCompanyInfo: item,
      },
      nzContent: DevCompanyModifyComponent,
      nzOnOk: () => {
        this.refreshData();
      },
      nzOnCancel: () => {
      },
    });
  }

  showDetail(item) {
    const modal = this.nzModal.create({
      nzTitle: '设备维护商详情',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '50%',
      nzComponentParams: {
        devCompanyInfo: item,
      },
      nzContent: DevCompanyDetailComponent,
      nzOnOk: () => {
      },
      nzOnCancel: () => {
      },
    });
  }
  confirmDel(no) {
    const params = {
      data: {no: no},
      type: 'del'
    };
    this.devCompanyService.delDevCompanys(no)
        .subscribe(_data => {
          console.log(_data);
          this.message.success('删除成功');
          this.refreshData();
        }, (error) => {
          console.log(error);
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });
  }
  cancel() {}
}
