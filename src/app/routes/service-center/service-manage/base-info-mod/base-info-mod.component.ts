import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ServiceManageService } from '../service-manage.service';
import { DetailModComponent } from "./detail-mod.component";
import { StatusModComponent } from "./status-mod.component";
import { SYS_CONS } from "../../../../models/constant";

/**
 * @description 修改服务基本信息
 * @export
 * @class BaseInfoModComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './base-info-mod.component.html'
})
export class BaseInfoModComponent implements OnInit {

  selectedIndex;
  serviceInfo; // 服务信息
  serviceInfoDetail: any = {};
  statusList: any[] = [];
  MERGE_FLAG = SYS_CONS.MERGE_FLAG; // 任务单是否可合并标志

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private serviceManageService: ServiceManageService,
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.serviceManageService.getServiceDetail(this.serviceInfo.serviceNo)
      .subscribe(result => {
        this.serviceInfoDetail = result;
        this.statusList = result['statusList'];
      })
  }

  baseInfoMod(detail) {
    this.modal.create({
      nzTitle: '服务基本信息修改',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: DetailModComponent,
      nzComponentParams: {
        serviceInfo: detail,
      },
      nzOnOk: () => {
        this.initData();
      }
    })
  }

  statusMod(item) {
    this.modal.create({
      nzTitle: '服务状态信息修改',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: StatusModComponent,
      nzComponentParams: {
        serviceNo: this.serviceInfo.serviceNo,
        statusInfo: item,
      },
      nzOnOk: () => {
        this.initData();
      }
    })
  }
}

