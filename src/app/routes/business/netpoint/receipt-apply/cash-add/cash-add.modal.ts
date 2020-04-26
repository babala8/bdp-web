import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../../models/constant';

@Component({
  selector: 'app-cash-add-modal',
  templateUrl: 'cash-add.modal.html',
  styles: [`
  input, nz-input-number {
      border-radius: 0;
  }
`]
})

export class CashAddComponent implements OnInit {
  CURRENCY_CODE = SYS_CONS.CURRENCY_CODE;
  CURRENCY_TYPE = SYS_CONS.CURRENCY_TYPE;
  DENOMINATION = SYS_CONS.DENOMINATION;
  deminationList: any = [];
  cashbox: any = [];
  upperDeminationList;

  cashClass = [
    {
      currencyType: '1',
      name: '完成券',
      denomination: [
        { type: '1', name: '100元', amount: null },
        { type: '2', name: '50元', amount: null },
        { type: '3', name: '20元', amount: null },
        { type: '4', name: '10元', amount: null },
        { type: '5', name: '5元', amount: null },
        { type: '6', name: '2元', amount: null },
        { type: '7', name: '纸1元', amount: null },
        { type: '8', name: '硬1元', amount: null },
        { type: '9', name: '纸5角', amount: null },
        { type: '10', name: '硬5角', amount: null },
        { type: '11', name: '纸1角', amount: null },
        { type: '12', name: '硬1角', amount: null },
        { type: '13', name: '纪念币', amount: null }
      ]
    },
    {
      currencyType: '2',
      name: '流通券',
      denomination: [
        { type: '1', name: '100元', amount: null },
        { type: '2', name: '50元', amount: null },
        { type: '3', name: '20元', amount: null },
        { type: '4', name: '10元', amount: null },
        { type: '5', name: '5元', amount: null },
        { type: '6', name: '2元', amount: null },
        { type: '7', name: '纸1元', amount: null },
        { type: '8', name: '硬1元', amount: null },
        { type: '9', name: '纸5角', amount: null },
        { type: '10', name: '硬5角', amount: null },
        { type: '11', name: '纸1角', amount: null },
        { type: '12', name: '硬1角', amount: null },
        { type: '13', name: '纪念币', amount: null }
      ]
    },
  ];

  constructor(private modalRef: NzModalRef) { }

  ngOnInit() {
    this.handleDemination();
  }

  // 处理deminationList
  handleDemination() {

    this.upperDeminationList.forEach(demination => {
      this.cashClass.forEach(cash => {
        if (cash.name === demination.currencyType) {
          cash.denomination.forEach(item => {
            if (item.name === demination.denomination) {
              item.amount = demination.amount;
            }
          })
        }
      })
    })

  }

  handleCancel() {
    this.modalRef.destroy();
  }

  handleOk() {
    this.cashClass.forEach(item => {
      item.denomination.forEach(denomination => {
        if (!!denomination.amount) {
          const detail = {
            amount: denomination.amount,
            direction: 2,
            productNo: 'X0001',
            currencyType: item.name,
            currencyCode: "人民币",
            denomination: denomination.name,
            detailList: [
              {
                key: 'currencyType',
                name: '币种',
                value: item.name
              },{
                key: 'currencyCode',
                name: '钞币类别',
                value: '人民币'
              },{
                key: 'denomination',
                name: '面值',
                value: denomination.name
              }
            ]
          }

          this.cashbox.push(detail);

          this.deminationList.push({
            currencyType: item.currencyType,
            currencyCode: '1',
            denomination: denomination.type,
            amount: denomination.amount,
          })
        }
      });
    })
    this.modalRef.triggerOk();
  }
}
