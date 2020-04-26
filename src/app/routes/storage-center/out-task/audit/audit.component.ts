import { Component, OnInit } from '@angular/core';
import {OPERATETYPE, SYS_CONS} from 'app/models/constant';
import { CommonService } from 'app/routes/common.service';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import { StorageCenterService } from './../../storage-center.service';
import {CashAddComponent} from "../cash-add/cash-add.modal";

/** 出库任务审核 */
@Component({
  templateUrl: 'audit.component.html'
})
export class AuditComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  taskNo;
  detail = {
    clrCenterNo: null,
    customer: {
      name: null,
      containerList: []
    },
    planFinishDate: null,
    note: null,
    taskType: null
  };
  auditNote;
  nextStatus;
  constructor(
    private modalRef: NzModalRef,
    private _common: CommonService,
    private message: NzMessageService,
    private modal: NzModalService,
    private service: StorageCenterService
  ) { }

  ngOnInit() {
    this._common.qryTaskDetail(this.taskNo).subscribe(
      result => {
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        this.detail.customer.containerList = taskDetail.customerNoList[0].currencyTypeList;
        this.getCustomerName(taskDetail.customerNoList[0].customerNo);
      }
    );
  }

  getCustomerName(orgNo) {
    this._common.qryOrgDetail(orgNo).subscribe(
      result => this.detail.customer.name = result.name
    );
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  // 审核通过操作
  audit() {
    const params = {
      taskNo: this.taskNo,
      taskType: this.detail.taskType,
      operateType: OPERATETYPE.JinKuQueRen,
      // nextStatus: this.nextStatus,
      auditNote: this.auditNote
    };
    this.service.audit(params).subscribe(
      result => {
        this.message.success(result.retMsg);
        this.modalRef.triggerOk();
      }
    );
  }

  // 审核退回
  refuse() {
    const params = {
      taskNo: this.taskNo,
      operateType: OPERATETYPE.Return,
      taskType: this.detail.taskType,
      auditNote: this.auditNote
    };
    this.service.audit(params).subscribe(
      result => {
        this.message.success(result.retMsg);
        this.modalRef.triggerOk();
      }
    );
  }

  modCash($event: MouseEvent){
    $event.stopPropagation();
    this.modal.create({
      nzTitle: '修改领现明细',
      nzContent: CashAddComponent,
      nzComponentParams: {
        deminationList: this.detail.customer.containerList,
        // amountSame: true
      },
      nzFooter: null,
      nzWidth: 1024,
      nzZIndex: 199,
      nzOnOk: result => {
        console.log(result);
        this.detail.customer.containerList = result.deminationList;
        console.log(this.detail)
      }
    })
  }

}
