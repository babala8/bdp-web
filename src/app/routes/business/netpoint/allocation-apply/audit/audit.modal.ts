import { Component, OnInit } from '@angular/core';
import { OPERATETYPE, SYS_CONS } from '../../../../../models/constant';
import { NzModalRef, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NetPointService } from '../../netpoint.service';
import { CashAddComponent } from '../apply/cash-add/cash-add.modal';

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
      containerList: [],
      currencyList: []
    },
    planFinishDate: null,
    note: null,
    taskType: null
  };
  opinion;
  operate;
  customerNo;

  constructor(
    private netPointService: NetPointService,
    private modalRef: NzModalRef,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.netPointService.qryTaskDetail(this.taskNo).subscribe(
      result => {
        console.log(result)
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        this.detail.planFinishDate = taskDetail.planFinishDate
        taskDetail.taskDetailList.forEach(item => {
          item.detailList.forEach(data => {
            item[data.key] = data.value
          })
        })
        taskDetail.taskEntityPOList.forEach(item => {
          item.taskEntityDetailDTOList.forEach(data => {
            item[data.key] = data.value
          })
        })
        this.detail.customer.containerList = taskDetail.taskEntityPOList;
        this.detail.customer.currencyList = taskDetail.taskDetailList;
        console.log(taskDetail.taskDetailList)
        this.customerNo = taskDetail.customerNo;
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
      // nextStatus: this.nextStatus,
      operateType: this.operate,
      auditNote: this.opinion,
      customerNo: this.customerNo,
      taskProductDTOList: this.detail.customer.currencyList
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
      // nextStatus: SYS_CONS.STATE.NET_DEPOSIT_TASK[8].value,
      operateType: OPERATETYPE.Return,
      taskType: this.detail.taskType,
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
    this.modal.create({
      nzTitle: '修改解现明细',
      nzContent: CashAddComponent,
      nzComponentParams: {
        transferCurrencyTypeDTOS: this.detail.customer.currencyList,
        amountSame: true
      },
      nzFooter: null,
      nzWidth: 1024,
      nzZIndex: 199,
      nzOnOk: result => {
        console.log(result);
        this.detail.customer.currencyList = result.transferCurrencyTypeDTOS;
        console.log(this.detail)
      }
    })
  }

}
