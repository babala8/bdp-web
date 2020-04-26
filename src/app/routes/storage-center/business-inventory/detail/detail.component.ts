import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { StorageCenterService } from '../../storage-center.service';

/** 业务库库存详情 */
@Component({
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  data;
  detailList;
  expandForm = false;
  expand = false;
  bagList = [];
  loading = true;
  dataList = [];
  cassetteList = [];

  constructor(private service: StorageCenterService) { }

  ngOnInit() {
    this.getData()
    this.detailList = [
      {
        name: '笼车编号',
        value: this.data.shelfNo
      },
      {
        name: '加钞任务单',
        value: this.data.taskNo
      },
      {
        name: '加钞线路',
        value: this.data.lineName
      },
    ];

  }

  getData() {
    this.service.getTaskDetail({ taskNo: this.data.taskNo })
      .subscribe(_data => {
        this.dataList = _data['devs'];
        this.dataList.forEach(value => {
          this.bagList = value['cassetteBagList'];
          this.bagList.forEach(value1 => {
            this.cassetteList = value1['cassetteNoList'];
          })
        })
        this.loading = false;
      })
  }
}
