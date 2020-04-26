import { CashAddComponent } from './cash-add/cash-add.modal';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/core/session.service';
import * as addDays from 'date-fns/add_days';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../../models/constant';
import { NetPointService } from '../../netpoint.service';
import { CashboxAddComponent } from './cashbox-add/cashbox-add.modal';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as _ from 'lodash';

@Component({
  templateUrl: './apply.modal.html',
})
export class ApplyModalComponent implements OnInit {
  addForm = {
    clrCenterNo: null,
    customer: null,
    customerType: 3,
    planFinishDate: new Date(),
    note: null,
    taskType: 2
  };
  listOfData = [];
  listOfProduct = []
  transferCurrencyTypeDTOS = [];
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  isConfirmLoading = false;
  today = new Date();
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };

  constructor(
    private session: SessionService,
    private modal: NzModalService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
    private netPointService: NetPointService
    ) { }

  ngOnInit() {
    this.addForm.customer = this.session.userInfo.sysOrg;
  }

  addCashBox($event: MouseEvent) {
    $event.stopPropagation();
    this.modal.create({
      nzTitle: '添加款箱',
      nzContent: CashboxAddComponent,
      nzComponentParams: {
        org: this.addForm.customer
      },
      nzWidth: 1024,
      nzZIndex: 199,
      nzFooter: null,
      nzClassName: 'zj-modal',
      nzOnOk: result => {
        result.cashbox.taskEntityDetailDTOList = [];
        if (result.cashbox.containerType === SYS_CONS.GOODS_TYPE[0].value) {
          result.cashbox.productNo = 'R0001'; // 寄库箱
          if (result.cashbox.outDate > addDays(new Date(), 1)) {
            result.cashbox.depositType = SYS_CONS.DEPOSITE_TYPE[0].value;
          } else {
            result.cashbox.depositType = SYS_CONS.DEPOSITE_TYPE[1].value;
          }
          result.cashbox.taskEntityDetailDTOList.push({
            key: 'outDate',
            name: '出库日期',
            value: result.cashbox.outDate.format('YYYY-MM-DD')
          },{
            key: 'depositType',
            name: '寄库类型',
            value: result.cashbox.depositType
          })
        }else{
          result.cashbox.productNo = 'R0003'; // 款箱
          result.cashbox.taskEntityDetailDTOList.push({
            key: 'outDate',
            name: '出库日期',
            value: result.cashbox.outDate.format('YYYY-MM-DD')
          })
        }
        result.cashbox.outDate = result.cashbox.outDate.format('YYYY-MM-DD');
        const cashboxList = result.cashbox.entityNo.map(cashboxNo => {
          return {
            ...result.cashbox,
            entityNo: cashboxNo,
            direction: 2
          }
        });
        this.listOfData = _.uniqBy([...this.listOfData, ...cashboxList], 'entityNo');
      }
    });
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
        transferCurrencyTypeDTOS: this.transferCurrencyTypeDTOS
      },
      nzFooter: null,
      nzWidth: 1024,
      nzZIndex: 199,
      nzClassName: 'zj-modal',
      nzOnOk: result => {
        console.log(result)
        this.listOfProduct = result.cashbox
        this.transferCurrencyTypeDTOS = result.transferCurrencyTypeDTOS;
      }
    })
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  handleOk() {
    const params = {
      ...this.addForm,
      customerNo: this.addForm.customer.no,
      planFinishDate: this.addForm.planFinishDate.format('YYYY-MM-DD'),
      taskEntityDTOList: this.listOfData,
      taskProductDTOList: this.listOfProduct
    };
    this.isConfirmLoading = true;
    this.netPointService.addAllocation(params).subscribe(
      res => {
        this.message.success(res.retMsg);
        this.modalRef.triggerOk();
      },
      () => this.isConfirmLoading = false
    );
  }

  deleteRow(entityNo) {
    this.listOfData = this.listOfData.filter(container => container.entityNo!==entityNo);
  }

  get totalAmount() {
    return this.transferCurrencyTypeDTOS.reduce((total, item) => total + item.amount, 0);
  }
}
