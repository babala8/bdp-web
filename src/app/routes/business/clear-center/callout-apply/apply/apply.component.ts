import { Component, OnInit } from '@angular/core';
import { SessionService } from '@core/session.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { CashAddComponent } from './cash-add/cash-add.component';
import { ClearCenterService } from '../../clear-center.service';

@Component({
  templateUrl: './apply.component.html',
})

export class ApplyComponent implements OnInit {
  addForm = {
    clrCenterNo: null,
    customer: null,
    customerType: 3,
    planFinishDate: new Date(),
    note: null,
    taskType: 8,
  };
  isConfirmLoading = false;
  deminationList = [];
  listOfData = [];
  clrCenterList;
  constructor(
    private session: SessionService,
    private modal: NzModalService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
    private clearCenterService: ClearCenterService,
  ) {
  }

  ngOnInit() {
    this.getCustomer();
  }

  addRow() {
    this.modal.create({
      nzTitle: '添加具体调出信息',
      nzContent: CashAddComponent,
      nzComponentParams: {
        upperDeminationList: this.deminationList,
      },
      nzWidth: 1024,
      nzZIndex: 199,
      nzFooter: null,
      nzClassName: 'zj-modal',
      nzOnOk: result => {
        this.listOfData = result.cashbox;
        this.deminationList = [...result.deminationList];
      },
    });
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  handleOk() {
    const params = {
      ...this.addForm,
      customerNo: this.addForm.customer,
      planFinishDate: this.addForm.planFinishDate.format('YYYY-MM-DD'),
      taskProductDTOList: this.listOfData
    };
    this.isConfirmLoading = true;
    this.clearCenterService.addTask(params).subscribe(
      res => {
        this.message.success("申请单添加成功");
        this.modalRef.triggerOk();
        this.isConfirmLoading = false;
      },
      () => {
        this.isConfirmLoading = false;
      },
    );
  }

  getCustomer () {
    const params = { clrCenterType: 2};
    this.clearCenterService.qryCustomer(params)
      .subscribe(data => {
        this.clrCenterList = data['retList'];

      })
  }
}
