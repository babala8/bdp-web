import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService, NzModalRef } from "ng-zorro-antd";
import { StorageCenterService } from './../../storage-center.service';

/** 钞处领现选择出库款箱 */
@Component({
  templateUrl: './select-cashbox.component.html',
})
export class SelectCashboxComponent implements OnInit {

  data;
  detailList;
  loading = false;
  dataList = [];
  cashBoxList = [];
  formModel = {};
  validateForm: FormGroup;
  constructor(
    private message: NzMessageService,
    private nzModal: NzModalRef,
    private fb: FormBuilder,
    private service: StorageCenterService,
  ) { }

  ngOnInit() {
    this.getData();
    this.detailList = [
      {
        name: '任务单编号',
        value: this.data.taskNo
      }
    ];
    this.validateForm = this.fb.group({
      shelfNo: [null, Validators.required]
    })
  }

  getData() {
    this.loading = true;
    const getStorageEntityListParams = {
      "productNo": 'R0003',
    };
    this.service.getStorageEntityList(getStorageEntityListParams)
      .subscribe(_data => {
        this.loading = false;
        this.dataList = _data['retList'];

        // this.dataList.forEach(value => {
        //   this.cashBoxList = value['moneyInfos'];
        // })
        if (this.dataList['entityDetail']) {
          this.dataList['entityDetail'].forEach(item => {
            if (this.detailList) {
              item.detailList.forEach(property => {
                item[property.key] = property.value;
              });
            }
          });
        }
      }, err => {
        this.loading = false;
      });

  }

  _allChecked = false;
  _indeterminate = false;
  _refreshStatus() {
    const allChecked = this.dataList.every(value => value.checked === true);
    const allUnchecked = this.dataList.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnchecked)
  }

  // 钞处任务单出库绑定款箱
  outWarehouseCashbox() {
    // 获取任务单列表
    const arr = this.dataList.filter(item => {
      return item.checked;
    }).map(item1 => {
      console.log(item1.entityNo);
      return {
        'entityNo': item1.entityNo,
        'productNo': item1.productNo,
        "amount": item1.amount,
        "depositType": 0,
        "direction": 0,
        "leafFlag": 0,
      }
    });
    console.log(arr);

    // 检验用户输入
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
      }
      if (this.validateForm.invalid) {
        return;
      }
    }
    if (arr.length <= 0) {
      this.message.warning('请勾选款箱');
      return;
    }

    // 出库参数
    const outWarehouseCashboxParams = {
      "shelfNo": this.formModel['shelfNo'] && this.formModel['shelfNo'].trim() || '',
      "taskNo": this.data.taskNo,
      "taskType": this.data.taskType,
      "operateType": "JinKuQueRen",
      "customerNo": this.data.customerNo,
      "transferTaskDetailDTO": arr,
    };
    /*    console.log(outWarehouseCashboxParams);
        return;*/
    this.service.outWarehouseCashbox(outWarehouseCashboxParams)
      .subscribe(data => {
        this.loading = false;
        this.nzModal.triggerOk();
        this.message.success(
          `批量出库成功`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }
}
