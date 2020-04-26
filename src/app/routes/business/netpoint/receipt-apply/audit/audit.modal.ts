import { CashAddComponent } from '../cash-add/cash-add.modal';
import { Component, OnInit } from '@angular/core';
import {OPERATETYPE, SYS_CONS} from '../../../../../models/constant';
import { NzModalRef, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NetPointService } from '../../netpoint.service';

@Component({
  templateUrl: 'audit.modal.html'
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
  opinion;
  nextStatus;
  operateType;
  constructor(
    private netPointService: NetPointService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.netPointService.qryTaskDetail(this.taskNo).subscribe(
      result => {
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        taskDetail.taskDetailList.forEach(item => {
          item.detailList.forEach(data => {
            item[data.key] = data.value
          })
        });
        this.detail.customer.containerList = taskDetail.taskDetailList;
        this.getCustomerName(taskDetail.customerNo);
      }
    );
  }

  getCustomerName(orgNo) {
    this.netPointService.qryOrgDetail(orgNo).subscribe(
      result => this.detail.customer.name = result.name
    );
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  audit() {
    this.netPointService.audit({
      taskNo: this.taskNo,
      taskType: this.detail.taskType,
      operateType: this.operateType,
      auditNote: this.opinion
    }).subscribe(
      result => {
        this.message.success(result.retMsg);
        this.modalRef.triggerOk();
      }
    );
  }

  refuse() {
    this.netPointService.audit({
      taskNo: this.taskNo,
      taskType: this.detail.taskType,
      operateType: OPERATETYPE.Return,
      auditNote: this.opinion
    }).subscribe(
      result => {
        this.message.success(result.retMsg);
        this.modalRef.triggerOk();
      }
    );
  }

  modCash($event: MouseEvent){
    $event.stopPropagation();
    console.log(this.detail.customer );
    this.modal.create({
      nzTitle: '修改领现明细',
      nzContent: CashAddComponent,
      nzComponentParams: {
        upperDeminationList: this.detail.customer.containerList,
      },
      nzFooter: null,
      nzWidth: 1024,
      nzZIndex: 199,
      nzOnOk: result => {
        console.log(result);
        this.detail.customer.containerList = result.cashbox;
        console.log(this.detail)
      }
    })
  }
}
