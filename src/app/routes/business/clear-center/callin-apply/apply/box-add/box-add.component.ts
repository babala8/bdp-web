import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-box-add-modal',
  templateUrl: './box-add.html',
  styles: [`
    input, nz-input-number {
      border-radius: 0;
    }
  `],
})

export class BoxAddComponent implements OnInit {
  validateForm: FormGroup;
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

  constructor(private modalRef: NzModalRef,
              private message: NzMessageService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      entityNo: [null,Validators.required],
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  handleCancel() {
    this.modalRef.destroy();
  }

  handleOk() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }
    this.cashbox.amount = 0;
    this.cashbox.detailList = [];
    this.cashClass.forEach(item => {
      item.denomination.valueList.forEach(denomination => {
        // 获取当前detailList；
        if (!!denomination.amount) {
          this.cashbox.amount += parseFloat(denomination.amount);
          item.denomination['value'] = denomination.value;
          let detailList = this.getDetail(item);
          this.cashbox.detailList.push({
            productNo: 'X0001',
            direction: '1',
            leafFlag: '1',
            parentEntity: this.cashbox.entityNo,
            denomination: item['denomination']['value'],
            currencyType: item['currencyType']['value'],
            currencyCode: item['currencyCode']['value'],
            amount: denomination.amount,
            taskEntityDetailDTOList: detailList
          });
          this.deminationList.push({
            currencyCode: item.currencyCode.value,
            currencyType: item.currencyType.value,
            denomination: denomination.value,
            amount: denomination.amount,
            containerNo: this.cashbox.containerNo,
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

  scan() {
    this.message.warning('未检测到扫描设备!');
  }
}
