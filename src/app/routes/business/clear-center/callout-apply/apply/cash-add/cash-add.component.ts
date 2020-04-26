import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../../../models/constant';

@Component({
  selector: 'app-cash-add-modal',
  templateUrl: 'cash-add.html',
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
  upperDeminationList;
  cashbox: any = [];

  cashClass = [
    // key: currencyType  name: '券别’ value：'完整券'
    // key: currenctCode  name: '币种'  value: '人民币'
    // key: demination    name：'面值'  value: '100元'
    {
      currencyType: {
        key: 'currencyType',
        name: '券别',
        value: '完整券',
      },
      currencyCode: {
        key: 'currencyCode',
        name: '币种',
        value: '人民币'
      },
      denomination: {
        key: 'denomination',
        name: '面值',
        valueList: [
          { value: '100元', amount: null },
          { value: '50元', amount: null },
          { value: '20元', amount: null },
          { value: '10元', amount: null },
          { value: '5元', amount: null },
          { value: '2元', amount: null },
          { value: '纸1元', amount: null },
          { value: '硬1元', amount: null },
          { value: '纸5角', amount: null },
          { value: '硬5角', amount: null },
          { value: '纸1角', amount: null },
          { value: '硬1角', amount: null },
          { value: '纪念币', amount: null },
        ]
      },
      keyList: ['currencyType', 'currencyCode', 'denomination'],
    },
    {
      currencyType: {
        key: 'currencyType',
        name: '券别',
        value: '流通券',
      },
      currencyCode: {
        key: 'currencyCode',
        name: '币种',
        value: '人民币'
      },
      denomination: {
        key: 'denomination',
        name: '面值',
        valueList: [
          { value: '100元', amount: null },
          { value: '50元', amount: null },
          { value: '20元', amount: null },
          { value: '10元', amount: null },
          { value: '5元', amount: null },
          { value: '2元', amount: null },
          { value: '纸1元', amount: null },
          { value: '硬1元', amount: null },
          { value: '纸5角', amount: null },
          { value: '硬5角', amount: null },
          { value: '纸1角', amount: null },
          { value: '硬1角', amount: null },
          { value: '纪念币', amount: null },
        ]
      },
      keyList: ['currencyType', 'currencyCode', 'denomination'],
    },
  ];

  constructor(private modalRef: NzModalRef) { }

  ngOnInit() {
    this.handleDemination();
  }

  // 处理deminationList
  handleDemination() {
    console.log('处理数据');
    console.log(this.upperDeminationList);
    this.upperDeminationList.forEach(demination => {
      this.cashClass.forEach(cash => {
        if (cash.currencyType.value == demination.currencyType) {
          cash.denomination.valueList.forEach(item => {
            if (item.value == demination.denomination) {
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
      item.denomination.valueList.forEach(denomination => {
          if (!!denomination.amount) {
            item.denomination['value'] = denomination.value;
            let detailList = this.getDetail(item);
            this.cashbox.push({
              productNo: 'X0001',
              direction: '2',
              leafFlag: '1',
              amount: denomination.amount,
              detailList: detailList
            });
            this.deminationList.push({
              currencyType: item.currencyType.value,
              currencyCode: item.currencyType.value,
              denomination: denomination.value,
              amount: denomination.amount,
            });
          }
      });
    });
    this.modalRef.triggerOk();
  }

  getDetail(item) {
    let detailList = [];
    item.keyList.forEach(detail => {
      detailList.push({
        key: item[detail].key,
        name: item[detail].name,
        value: item[detail].value,
      });
    });
    return detailList;
  }
}
