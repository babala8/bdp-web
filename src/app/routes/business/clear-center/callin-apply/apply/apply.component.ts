import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { BoxAddComponent } from './box-add/box-add.component';
import { ClearCenterService } from '../../clear-center.service';
import { SessionService } from '@core/session.service';

@Component({
  templateUrl: './apply.html',
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
  detail: any = {
    clrCenterNo: null,
    customer: {
      name: null,
      containerList: [],
    },
    date: null,
    note: null,
  };
  clrCenterList;
  customerNo;
  listOfData = [];
  deminationList = [];
  loading = false;

  constructor(private modalRef: NzModalRef,
              private modal: NzModalService,
              private message: NzMessageService,
              private clearCenterService: ClearCenterService,
              private session: SessionService,
  ) {
  }

  ngOnInit() {
    this.getCustomer();
  }

  addBox() {
    const addModal = this.modal.create({
      nzTitle: '添加现金箱',
      nzContent: BoxAddComponent,
      nzWidth: 1024,
      nzZIndex: 199,
      nzClassName: 'zj-modal',
      nzFooter: null,
      nzOnOk: result => {
        console.log(result.cashbox);
        this.listOfData = [...this.listOfData, result.cashbox];
        result.deminationList.forEach(demination => {
          let index = this.deminationList.findIndex(item => {
            return demination.currencyType === item.currencyType && demination.denomination === item.denomination;
          });
          if (index < 0) {
            this.deminationList.push(demination);
          } else {
            this.deminationList[index].amount += parseFloat(demination.amount);
          }
        });
        this.deminationList = [...this.deminationList];
        // this.deminationList = [...result.deminationList];
      },
    });
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  deleteRow(i) {
    const delBox = this.listOfData.splice(i, 1);
    delBox[0]['detailList'].forEach(demination => {
      console.log(demination);
      let index = this.deminationList.findIndex(item => {
        console.log(demination.currencyType === item.currencyType && demination.denomination === item.denomination);

        return demination.currencyType === item.currencyType && demination.denomination === item.denomination;
      });
      if (index < 0) return;
      if (this.deminationList[index].amount <= demination.amount) {
        this.deminationList.splice(index, 1);
        return;
      }
      this.deminationList[index].amount -= parseFloat(demination.amount);
    });
    this.listOfData = [...this.listOfData];
    this.deminationList = [...this.deminationList];
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
      taskType: '9',
      customerType: 7,
      clrCenterNo: this.addForm.clrCenterNo,
      customerNo: this.addForm.customer,
      note: this.addForm.note,
      planFinishDate: this.addForm.planFinishDate.format('YYYY-MM-DD'),
      taskEntityDTOList: list,
    };
    this.loading = true;
    this.clearCenterService.addTask(params).subscribe(data => {
      this.message.success('申请单添加成功');
      this.modalRef.triggerOk();
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  getCustomer () {
    const params = { clrCenterType: 2};
    this.clearCenterService.qryCustomer(params)
      .subscribe(data => {
        this.clrCenterList = data['retList'];

      })
  }

}
