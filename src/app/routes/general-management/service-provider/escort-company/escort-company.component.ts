import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { EscortCompanyAddComponent } from './add/escort-company-add.component';
import { EscortCompanyModComponent } from './mod/escort-company-mod.component';
import { EscortCompanyAddMutipleComponent } from './add/escort-company-add-mutiple.component';
import {ServiceProviderService} from "../service-provider.service";
import { ServiceProvider } from '../../../../models/constant';
import { Page } from '../../../../models/page';
import { HttpResponse } from '@angular/common/http';

@Component({
  templateUrl: './escort-company.html'
})
export class EscortCompanyComponent implements OnInit{
  formModel = {};
  loading = false;
  dataList = [];
  page = new Page();
  providerType = ServiceProvider.PROVIDER_TYPE;

  constructor(private modal: NzModalService,
              private message: NzMessageService,
              private providerService: ServiceProviderService) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.refreshData(true);
  }

  // 查询服务商列表
  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      name: this.formModel['name'] ? this.formModel['name'] : '',
      type: this.providerType.escortCompany, //type:2
      curPage: this.page.curPage,   //当前页码
      pageSize: this.page.pageSize,   //每页条数
    };
    Object.assign(params);
    this.loading = true;
    this.providerService.qryProviderList(params)
      .subscribe(data => {
        this.dataList = data['retList'];
        this.page.totalRow = data['totalRow'];
        this.page.totalPage = data['totalPage'];
        this.loading = false;
      }, error => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  // 打开添加模态框
  openAdd() {
    const nzModalSubject = this.modal.create({
      nzTitle: '新增服务商信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: EscortCompanyAddComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 打开批量添加模态框
  openAddMutiple() {
    const nzModalSubject = this.modal.create({
      nzTitle: '批量添加服务商信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: EscortCompanyAddMutipleComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 打开修改模态框
  openMod(item) {
    const nzModalSubject = this.modal.create({
      nzTitle: '修改服务商信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: EscortCompanyModComponent,
      nzComponentParams: {
        provider: item
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 删除服务商
  delProvider(item) {
    this.providerService.delProvider(item.no)
      .subscribe(data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }), (error) => {
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    }
  }
}
