import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SYS_CONS } from 'app/models/constant';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { StorageCenterService } from './../../storage-center.service';

/** 库存核定 */
@Component({
  templateUrl: 'detail.component.html',
})
export class DetailComponent implements OnInit {
  loading = false;
  validateForm: FormGroup;
  formModel = {};

  constructor(
    private service: StorageCenterService,
    private message: NzMessageService,
    private nzSub: NzModalRef,
  ) { }

  ngOnInit() { }

  check() {
    this.loading = true;
    this.service.checkInventory({
      "clrCenterNo": this.formModel['clrCenterNo'],
      "checkInventoryDetailDTOList": this.dataSet
    })
      .subscribe(_data => {
        this.loading = false;
        this.nzSub.triggerOk();
        this.message.success("核查成功");
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });

  }

  containerList = [
    { "containerNo": "051003281998800001", "containerType": 6, "entityType": 1, "currencyCode": "CNY", "denomination": 1, "amount": 1000000 },
    { "containerNo": "051003281998800002", "containerType": 6, "entityType": 1, "currencyCode": "CNY", "denomination": 2, "amount": 500000 },
    { "containerNo": "051003281998800003", "containerType": 6, "entityType": 1, "currencyCode": "CNY", "denomination": 3, "amount": 2000000 },
    { "containerNo": "051003281998800004", "containerType": 6, "entityType": 1, "currencyCode": "CNY", "denomination": 1, "amount": 500000 },
    { "containerNo": "051003281998800005", "containerType": 6, "entityType": 1, "currencyCode": "CNY", "denomination": 2, "amount": 3000000 },
    { "containerNo": "051003281998800006", "containerType": 6, "entityType": 1, "currencyCode": "CNY", "denomination": 3, "amount": 1000000 },
    { "containerNo": "051003281998800007", "containerType": 6, "entityType": 1, "currencyCode": "CNY", "denomination": 3, "amount": 11000 },
    { "containerNo": "051003281998800008", "containerType": 6, "entityType": 1, "currencyCode": "CNY", "denomination": 2, "amount": 1000000 },
  ];

  containerTypes = [
    { name: '加钞钞袋', no: 1 },
    { name: '加钞钞箱', no: 2 },
    { name: '现金款箱', no: 3 },
    { name: '寄存款箱', no: 4 },
    { name: '钱捆', no: 5 },
    { name: '保管盒', no: 6 },
    { name: '现金实物', no: 7 }
  ];

  entityTypes = [
    { name: '现金', no: 1 },
    { name: '贵金属', no: 2 },
    { name: '重空', no: 3 }
  ];

  currencyCodes = SYS_CONS.CURRENCY_CODE;

  denominations = SYS_CONS.DENOMINATION;

  dataSet = [];
  tempList = [];
  count = 0;

  scan() {
    if (this.count > 7) {
      return;
    }
    this.tempList.push(this.containerList[this.count]);
    this.dataSet = [...this.tempList];
    this.count++;
  }

}
