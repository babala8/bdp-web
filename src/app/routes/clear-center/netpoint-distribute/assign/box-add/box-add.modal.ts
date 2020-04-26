import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { SYS_CONS } from './../../../../../models/constant';

@Component({
  selector: 'app-box-add-modal',
  templateUrl: 'box-add.modal.html',
  styles: [`
  input, nz-input-number {
      border-radius: 0;
  }
`]
})

export class BoxAddComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  cashbox: any = {
    entityNo: null,
    productNo: 'R0003',
    direction: '1',
    leafFlag: '0',
    amount: 0,
    detailList: []
  };
  deminationList = [];
  cashBoxList = [];
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

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  handleCancel() {
    this.modalRef.destroy();
  }

  handleOk() {
    this.cashbox.transferCurrencyTypeDTOS = [];
    this.cashClass.forEach(item => {
      item.denomination.forEach(denomination => {
        if (!!denomination.amount) {
          this.cashbox.amount += parseFloat(denomination.amount);
          console.log( this.cashbox.amount)
          const detail = {
            productNo: 'X0001',
            direction: '1',
            leafFlag: '1',
            parentEntity: this.cashbox.entityNo,
            amount: denomination.amount,
            currencyType:item.name,
            currencyCode:'人民币',
            denomination: denomination.name,
            taskEntityDetailDTOList: [
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

          this.cashbox.detailList.push(detail);
        }
      });
    })
    this.modalRef.triggerOk();
  }

  scan() {
    this.message.warning('未检测到扫描设备!');
  }
}
