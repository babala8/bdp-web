import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../models/constant';
import { ClearCenterService } from '../../clear-center.service';

@Component({
  selector: 'app-ATM-allocation-query-detail',
  templateUrl: './ATM-allocation-query-detail.component.html',
})
export class ATMAllocationQueryDetailComponent implements OnInit {
  data;
  detailList;
  loading = true;
  dataList = [];

  bagList = SYS_CONS.BAG_STATUS;
  bagTypeList = SYS_CONS.BAG_TYPE;
  taskStatus = SYS_CONS.STATE.ADDNOTE_TASK;

  constructor(
    private service: ClearCenterService,
  ) {
  }

  ngOnInit() {
    this.getData();
    this.detailList = [
      {
        name: '任务单编号',
        value: this.data.taskNo,
      },
      {
        name: '加钞线路',
        value: this.data.lineName,
      },
      {
        name: '状态',
        value: this.data.status != 0 && !!this.data.status ? this.taskStatus.find((myObj => myObj.value === this.data.status)).name : '',
      },
    ];
  }


  getData() {
    this.service.getDetailAtmCash(this.data.taskNo)
      .subscribe(_data => {
        this.dataList = _data['retList'];
        this.dataList.forEach(dev => {
          dev.amount = dev.containerEntityDTOs.reduce((sum, ele) => sum + ele.amount, 0);
        });
        this.loading = false;
      }, () => this.loading = false);
  }
}
