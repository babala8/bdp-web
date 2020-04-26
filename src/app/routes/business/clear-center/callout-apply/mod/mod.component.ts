import { Component, OnInit } from '@angular/core';
import { SessionService } from '@core/session.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { CashAddComponent } from '../apply/cash-add/cash-add.component';
import { ClearCenterService } from '../../clear-center.service';

@Component({
  templateUrl: './mod.html',
})

export class ModComponent implements OnInit {
  addForm: any = {
    customerType: 3,
    taskType: 8,
  };
  isConfirmLoading = false;
  deminationList = [];
  taskDetail;
  task;
  listOfData = [];
  constructor(
    private session: SessionService,
    private modal: NzModalService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
    private clearCenterService: ClearCenterService,
  ) {
  }

  ngOnInit() {
    this.clearCenterService.qryReceiptDetail(this.task.taskNo).subscribe(
      result => {
        this.taskDetail = result.retList[0];
        Object.assign(this.addForm, {
          clrCenterNo: this.task.clrCenterNo,
          customer: {
            no: this.task.customerNo,
            name: this.task.customerName
          },
          planFinishDate: new Date(this.task.planFinishDate),
          modeNote: this.task.modeNote,
        });
        this.listOfData = this.taskDetail.taskDetailList;
        this.deminationList = this.taskDetail.taskDetailList.map(item => {
          item.detailList.forEach(property => {
            item[property.key] = property.value;
          });
          return item;
        });
        // this.deminationList = this.taskDetail.customerNoList[0].currencyTypeList;
      },
    );
  }

  addRow() {
    this.modal.create({
      nzTitle: '调整具体调出信息',
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
      taskNo: this.task.taskNo,
      customerNo: this.addForm.customer.no,
      operateType: 'Mod',
      planFinishDate: this.addForm.planFinishDate.format('YYYY-MM-DD'),
      taskProductDTOList: this.listOfData
    };
    this.isConfirmLoading = true;
    this.clearCenterService.modTask(params).subscribe(
      res => {
        this.isConfirmLoading = false;
        this.message.success(res['retMsg']);
        this.modalRef.triggerOk();
      },
      () => {
        this.isConfirmLoading = false;
      },
    );
  }
}
