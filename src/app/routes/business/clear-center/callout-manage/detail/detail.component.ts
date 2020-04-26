import { Component, OnInit } from '@angular/core';
import { ClearCenterService } from '../../clear-center.service';

@Component({
  templateUrl: './detail.html',
})
export class DetailComponent implements OnInit {
  taskNo;
  task;
  containerList = [];
  taskDetail;
  selectedIndex = 0;
  recordList = [];
  firstRenderFlag = true;
  statusTransitionList = [];
  statusList = [];
  containerDetailList = [];

  constructor(private clearCenterService: ClearCenterService) {
  }

  ngOnInit(): void {
    this.clearCenterService.qryReceiptDetail(this.task.taskNo).subscribe(
      result => {
        this.taskDetail = result.retList[0];
        this.containerList = this.taskDetail.customerNoList[0].containerNoList;
        this.containerDetailList = this.taskDetail.customerNoList[0].currencyTypeList;

      },
    );
    // 查询产品服务详情
    this.clearCenterService.getServiceDetail(this.task.taskType)
      .subscribe(result => {
        this.statusTransitionList = result['statusConvertList'];
        this.statusList = result['statusList'];
      });
    // 查询任务单操作记录
    this.qryOperateRecord();
  }

  // 查询操作记录，处理数据
  qryOperateRecord() {
    console.log('查询操作记录');
    this.clearCenterService.qryOperateRecord(this.task.taskNo)
      .subscribe(result => {
        this.recordList = result['retList'];
      });
  }
}

