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
  statusList = [];
  statusTransitionList = [];
  containerDetailList=[];
  constructor(private clearCenterService: ClearCenterService) {
  }

  ngOnInit(): void {
    // 查询申请单详情
    this.clearCenterService.qryReceiptDetail(this.task.taskNo).subscribe(
      result => {
        this.taskDetail = result.retList[0];
        // taskDetailPropertyDOList
        this.containerList = this.taskDetail.taskDetailList;
        this.containerDetailList = this.taskDetail.taskDetailList.map(item => {
          item.detailList.forEach(property => {
            item[property.key] = property.value;
          });
          return item;
        });
        console.log(this.containerDetailList);
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
    this.clearCenterService.qryOperateRecord(this.task.taskNo)
      .subscribe(result => {
        this.recordList = result['retList'];
      });
  }
}
