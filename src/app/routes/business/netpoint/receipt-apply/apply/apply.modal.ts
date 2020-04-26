import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/core/session.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../../models/constant';
import { NetPointService } from '../../netpoint.service';
import { CashAddComponent } from '../cash-add/cash-add.modal';

@Component({
  templateUrl: './apply.modal.html',
})
export class ReceiptApplyModal implements OnInit {
  addForm = {
    clrCenterNo: null,
    customer: null,
    customerType: 3,
    planFinishDate: new Date(),
    note: null,
    taskType: 4
  };
  listOfData = [];
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  isConfirmLoading = false;
  detail=[];
  deminationList = [];
  result; // 任务单申请成功后的返回结果

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

  addRow() {
    const addModal = this.modal.create({
      nzTitle: '添加具体领用',
      nzContent: CashAddComponent,
      nzComponentParams: {
        upperDeminationList: this.listOfData,
      },
      nzWidth: 1024,
      nzZIndex: 199,
      nzFooter: null,
      nzClassName: 'zj-modal',
      nzOnOk: result => {
        // result.cashbox.amount = result.cashbox.transferCurrencyTypeDTOS.reduce((total, item) => {
        //     return total + parseFloat(item.amount);
        //   }, 0);
        this.listOfData = result.cashbox;
      }
    });
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  handleOk() {
    const params = {
      ...this.addForm,
      customerNo: this.addForm.customer.no,
      planFinishDate: this.addForm.planFinishDate.format('YYYY-MM-DD'),
      taskProductDTOList: this.listOfData
    };
    this.isConfirmLoading = true;
    this.netPointService.addAllocation(params).subscribe(
      res => {
        this.result = res;
        this.message.success(res.retMsg);
        this.modalRef.triggerOk();
        },
        () => this.isConfirmLoading = false
    );

  }

}
