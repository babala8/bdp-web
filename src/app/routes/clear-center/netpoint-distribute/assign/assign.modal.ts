import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { OPERATETYPE, SYS_CONS } from './../../../../models/constant';
import { ClearCenterService } from '../../clear-center.service';
import { BoxAddComponent } from './box-add/box-add.modal';

@Component({
  templateUrl: 'assign.modal.html'
})

export class AssignComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  taskNo;
  detail: any = {
    clrCenterNo: null,
    customer: {
      name: null,
      containerList: []
    },
    date: null,
    note: null,
  };
  customerNo;
  listOfData = [];
  deminationList = [];
  loading = false;
  constructor(private service: ClearCenterService,
    private modalRef: NzModalRef,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.service.qryReceiptDetail(this.taskNo).subscribe(
      result => {
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        taskDetail.taskDetailList.forEach(item => {
          item.detailList.forEach(data => {
            item[data.key] = data.value
          })
        });
        this.detail.customer.containerList = taskDetail.taskDetailList;
        console.log(this.detail.customer.containerList);
        this.customerNo = taskDetail.customerNo;
        this.getCustomerName(taskDetail.customerNo);
      }
    );
  }

  getCustomerName(orgNo) {
    this.service.qryOrgDetail(orgNo).subscribe(
      result => this.detail.customer.name = result.name
    );
  }

  addBox() {
    const addModal = this.modal.create({
      nzTitle: '添加领现箱',
      nzContent: BoxAddComponent,
      nzWidth: 1024,
      nzZIndex: 199,
      nzClassName: 'zj-modal',
      nzFooter: null,
      nzOnOk: result => {

        this.listOfData = [...this.listOfData, result.cashbox];
        console.log(this.listOfData)
      }
    });
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  deleteRow(entityNo) {
    this.listOfData = this.listOfData.filter(container => container.entityNo !== entityNo);
  }

  assign() {
    let list = [];
    this.listOfData.forEach(item => {
      console.log(item.amount);
      let { amount, direction, entityNo, leafFlag, productNo} = item;
      list.push({amount, direction, entityNo, leafFlag, productNo});
      item.detailList.forEach(detail => {
        let { amount, direction, parentEntity, leafFlag, productNo, taskEntityDetailDTOList} = detail;
        list.push({ amount, direction, parentEntity, leafFlag, productNo, taskEntityDetailDTOList});
      });
    });

    const params: any = {
      taskNo: this.taskNo,
      customerNo: this.customerNo,
      taskType: '4',
      // nextStatus: this.nextStatus,
      containerEntityDTOs: list,
      customerType: 3,
      operateType: OPERATETYPE.LoadNote,
    };
    this.loading = true;
    this.service.loadNote(params).subscribe(data => {
      this.message.success('配款成功');
      this.modalRef.triggerOk();
    }, err => {
      this.loading = false;
    });
  }
}
