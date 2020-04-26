import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Page } from 'app/models/page';
import { ServiceCenterService } from '../service-center.service';
import { BaseInfoAddComponent } from './base-info-add/base-info-add.component';
import { DetailComponent } from './detail/detail.component';
import { StatusTransitionComponent } from './status-transition/status-transition.component';
import { StatusComponent } from './status/status.component';
import { ServiceManageService } from './service-manage.service';
import { ProductComponent } from './product/product.component';
import { BaseInfoModComponent } from "./base-info-mod/base-info-mod.component";

/**
 * @description 服务分页查询
 * @export
 * @class ServiceManageComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  templateUrl: './service-manage.component.html'
})
export class ServiceManageComponent implements OnInit, AfterViewInit {
  item;
  loading;
  serviceList: any[] = [null];
  formModel = {};
  customerTypeList: any[] = [];
  page = new Page();

  constructor(
    public msg: NzMessageService,
    private modal: NzModalService,
    private serviceManageService: ServiceManageService
  ) { }

  ngOnInit(): void {
    this.refreshData(true);
    this.qryCustomerList();
  }

  ngAfterViewInit(): void { }

  refreshData(reset = false): void {
    if (reset) {
      this.page.curPage = 1;
    }

    const params = {
      serviceNo: this.formModel['serviceNo'] || '',
      serviceName: this.formModel['serviceName'] || '',
      customerType: this.formModel['customerType'] || '',
    };
    Object.assign(params, this.page);
    this.serviceManageService.serviceInfo(params)
      .subscribe(result => {
        this.serviceList = result['retList'];
        this.serviceList.unshift(null);
        this.page.totalRow = result['totalRow'];
      })
  }

  // 查询服务的服务对象列表
  qryCustomerList() {
    this.serviceManageService.qryCustomerTypeList()
      .subscribe(result => {
        this.customerTypeList = result['retList'];
      })
  }

  // 添加服务
  addProduction() {
    this.modal.create({
      nzTitle: '添加服务',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: BaseInfoAddComponent,
      nzOnOk: () => {
        this.refreshData(true);
      }
    })
  }

  // 修改服务基本信息
  modProduction(productionInfo) {
    this.modal.create({
      nzTitle: `${productionInfo.serviceName}-服务基本信息管理`,
      nzWidth: '80%',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: BaseInfoModComponent,
      nzComponentParams: {
        serviceInfo: productionInfo,
      },
      nzOnOk: () => {
        this.refreshData(true);
      }
    })
  }

  // 打开详情界面
  openDetail(item) {
    this.modal.create({
      nzTitle: `${item.serviceName}-服务信息`,
      nzWidth: '80%',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: DetailComponent,
      nzComponentParams: {
        serviceInfo: item,
      }
    });
  }

  // 打开状态管理页面
  openStatusManage(item) {
    this.modal.create({
      nzTitle: `${item.serviceName}-状态管理`,
      nzWidth: '900px',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: StatusComponent,
      nzComponentParams: {
        serviceInfo: item,
      },
      nzOnOk: () => {
        this.refreshData();
      }
    })
  }

  // 打开流程管理界面
  openStatusTransitionManage(item) {
    this.modal.create({
      nzTitle: `${item.serviceName}-流程管理`,
      nzWidth: '80%',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: StatusTransitionComponent,
      nzComponentParams: {
        serviceInfo: item,
      },
      nzOnOk: () => {
        this.refreshData();
      }
    })
  }
  // 打开物品信息管理界面
  openGoodsManage(item) {
    this.modal.create({
      nzTitle: `${item.serviceName}-物品信息管理`,
      nzWidth: '80%',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: ProductComponent,
      nzComponentParams: {
        serviceInfo: item,
      },
      nzOnOk: () => {
        this.refreshData();
      }
    })
  }

  // 改变服务启用废弃状态
  changeProdStatus(productNo, status) {
    const params = {
      serviceNo: productNo,
      status: status
    };
    this.serviceManageService.changeServiceStatus(params)
      .subscribe(() => {
        this.msg.success('操作成功');
        this.refreshData();
      }, () => { })
  }
}
