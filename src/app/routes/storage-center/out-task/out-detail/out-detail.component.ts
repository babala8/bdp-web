import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/routes/common.service';
import { StorageCenterService } from './../../storage-center.service';

/** 出库任务详情 */
@Component({
  templateUrl: './out-detail.component.html',
})
export class OutDetailComponent implements OnInit {
  data;
  // 从上一个组件传过来的任务单信息
  taskDetail;
  containerList = [];
  selectedIndex = 0;
  recordList = [];
  firstRenderFlag = true;
  statusTransitionList = [];
  statusList = [];
  containerDetailList = [];

  constructor(
    private service: StorageCenterService,
    private _common: CommonService
  ) { }

  ngOnInit(): void {
    this._common.qryTaskDetail(this.data.taskNo).subscribe(
      result => {
        this.taskDetail = result.retList[0];
        this.containerList = this.taskDetail.taskDetailList;
        this.containerDetailList = this.containerList.map(item => {
          item.detailList.forEach(property => {
            item[property.key] = property.value;
          });
          return item;
        });
      },
    );
    // 查询产品服务详情
    this.service.getServiceDetail(this.data.taskType)
      .subscribe(result => {
        this.statusTransitionList = result['statusConvertList'];
        this.statusList = result['statusList'];
      });
  }

}

