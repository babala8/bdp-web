import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../../models/constant';
import { NzModalRef } from 'ng-zorro-antd';
import { CommonService } from '../../common.service';

@Component({
  templateUrl: 'apply-detail.component.html',
})

export class ApplyDetailComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  taskNo;
  detail: any = {
    clrCenterNo: null,
    customer: {
      name: null,
      containerList: [],
      currencyList: [],
    },
    planFinishDate: null,
    note: null,
  };

  constructor(private commonService: CommonService,
              private modalRef: NzModalRef) {
  }

  ngOnInit() {
    this.commonService.qryDetail(this.taskNo).subscribe(
      result => {
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        this.detail.customer.containerList = taskDetail.customerNoList[0].containerNoList;
        this.detail.customer.currencyList = taskDetail.customerNoList[0].currencyTypeList;
      },
    );
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }
}
