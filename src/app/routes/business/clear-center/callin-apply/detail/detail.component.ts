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

  constructor(private clearCenterService: ClearCenterService) {
  }

  ngOnInit(): void {
    this.clearCenterService.qryReceiptDetail(this.task.taskNo).subscribe(
      result => {
        this.taskDetail = result.retList[0];
        console.log(this.dealEntity(this.taskDetail.taskEntityPOList));
        this.containerList = this.dealEntity(this.taskDetail.taskEntityPOList);
        // this.containerList.forEach(item => {
        //   item.amount = 0;
        //   item.taskEntityDetailDTOList.forEach(currency => {
        //     item.amount += currency.amount;
        //   })
        // })
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

  dealEntity(entityList) {
    let dealList = entityList.filter(item => {
      return !item.parentEntity;
    });
    dealList.forEach(entity => {
      entity.detailList = [];
      entityList.forEach(allContainer => {
        if (entity.entityNo === allContainer.parentEntity) {
          allContainer.taskEntityDetailDTOList.forEach(detail => {
            allContainer[detail.key] = detail.value;
          });
          entity.detailList.push(allContainer);
        }
      });
    });
    return dealList;
  }
}
