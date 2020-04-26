import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../../models/constant';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { NetPointService } from '../../netpoint.service';
import { CashAddComponent } from '../apply/cash-add/cash-add.modal';
import { SessionService } from '@core/session.service';
import { CashboxAddComponent } from '../apply/cashbox-add/cashbox-add.modal';
import * as addDays from 'date-fns/add_days';
import * as _ from 'lodash';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
  templateUrl: 'modify.modal.html',
})

export class ModifyComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  task;
  operateType;
  listOfData = [];
  transferCurrencyTypeDTOS = [];
  isConfirmLoading = false;
  addForm = {
    customerType: 3,
    taskType: 2,
  };
  detail = {
    clrCenterNo: null,
    customer: {
      name: null,
      no: null,
    },
    containerList: [],
    currencyList: [],
    planFinishDate: null,
    note: null,
  };
  opinion;
  customerNo;
  listOfProduct =[]
  today = new Date();
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };
  constructor(
    private session: SessionService,
    private netPointService: NetPointService,
    private modalRef: NzModalRef,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    console.log(this.task)
    this.detail.clrCenterNo = this.task.clrCenterNo;
    this.netPointService.qryTaskDetail(this.task.taskNo).subscribe(
      result => {
        console.log(result);
        const taskDetail = result.retList[0];
        Object.assign(this.detail, {
          clrCenterNo: taskDetail.clrCenterNo,
          customer: {
            no: taskDetail.customerNo,
            name: taskDetail.customerName,
          },
          planFinishDate: taskDetail.planFinishDate,
          modeNote: taskDetail.modeNote,
          taskType: taskDetail.taskType,
          taskNo: taskDetail.taskNo,
        });
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
        this.detail.containerList = taskDetail.taskEntityPOList;
        this.detail.currencyList = this.transferCurrencyTypeDTOS = taskDetail.taskDetailList;
        this.listOfData = taskDetail.taskEntityPOList
        this.customerNo = taskDetail.customerNo;
        this.getCustomerName(taskDetail.customerNo);
      },
    );

  }

  getCustomerName(orgNo) {
    this.netPointService.qryOrgDetail(orgNo).subscribe(
      result => this.detail.customer.name = result.name,
    );
  }
  get totalAmount() {
    return this.transferCurrencyTypeDTOS.reduce((total, item) => total + item.amount, 0);
  }


  handleCancel() {
    this.modalRef.triggerCancel();
  }

  audit() {
    this.netPointService.audit({
      taskNo: this.task.taskNo,
      operateType: this.operateType,
      auditNote: this.opinion,
      customerNo: this.customerNo,
      transferCurrencyTypeDTO: this.detail.currencyList,
    }).subscribe(
      result => {
        this.message.success(result.retMsg);
        this.modalRef.triggerOk();
      },
    );
  }

  modCash($event: MouseEvent) {
    $event.stopPropagation();
    this.modal.create({
      nzTitle: '修改解现明细',
      nzContent: CashAddComponent,
      nzComponentParams: {
        transferCurrencyTypeDTOS: this.transferCurrencyTypeDTOS,
        amountSame: true,
      },
      nzFooter: null,
      nzWidth: 1024,
      nzZIndex: 199,
      nzOnOk: result => {
        console.log(result);
        this.detail.currencyList = result.cashbox;
        this.transferCurrencyTypeDTOS = result.transferCurrencyTypeDTOS;
        console.log(this.detail);
      },
    });
  }

  addCashBox($event: MouseEvent) {
    console.log(this.detail)
    $event.stopPropagation();
    this.modal.create({
      nzTitle: '添加款箱',
      nzContent: CashboxAddComponent,
      nzComponentParams: {
        org: this.detail.customer,
      },
      nzWidth: 1024,
      nzZIndex: 199,
      nzFooter: null,
      nzClassName: 'zj-modal',
      nzOnOk: result => {
        if (result.cashbox.containerType === SYS_CONS.GOODS_TYPE[0].value) {
          if (result.cashbox.outDate > addDays(new Date(), 1)) {
            result.cashbox.depositType = SYS_CONS.DEPOSITE_TYPE[0].value;
          } else {
            result.cashbox.depositType = SYS_CONS.DEPOSITE_TYPE[1].value;
          }
        }
        result.cashbox.outDate = result.cashbox.outDate.format('YYYY-MM-DD');
        const cashboxList = result.cashbox.entityNo.map(cashboxNo => {
          return {
            ...result.cashbox,
            entityNo: cashboxNo,
          };
        });
        this.listOfData = _.uniqBy([...this.listOfData, ...cashboxList], 'entityNo');
      },
    });
  }

  deleteRow(entityNo) {
    this.listOfData = this.listOfData.filter(container => container.entityNo !== entityNo);
  }

  addCash($event: MouseEvent) {
    $event.stopPropagation();
    const i = this.listOfData.findIndex(item => item.containerType === this.GOODS_TYPE[1].value);
    if (i < 0) {
      this.message.warning('请添加现金款箱！');
      return;
    }
    this.modal.create({
      nzTitle: '添加解现明细',
      nzContent: CashAddComponent,
      nzComponentParams: {
        transferCurrencyTypeDTOS: this.detail.currencyList,
      },
      nzFooter: null,
      nzWidth: 1024,
      nzZIndex: 199,
      nzClassName: 'zj-modal',
      nzOnOk: result => {
        console.log(result)
        this.detail.currencyList = result.transferCurrencyTypeDTOS;
      },
    });
  }

  handleOk() {
    const params = {
      ...this.detail,
      operateType: this.operateType,
      customerNo: this.customerNo,
      planFinishDate: this.detail.planFinishDate,
      taskEntityDTOList: this.listOfData,
      taskProductDTOList: this.detail.currencyList
    };
    console.log(params)
    this.isConfirmLoading = true;
    this.netPointService.modAllocation(params).subscribe(
      res => {
        this.message.success(res.retMsg);
        this.modalRef.triggerOk();
      },
      () => this.isConfirmLoading = false,
    );
  }

}
