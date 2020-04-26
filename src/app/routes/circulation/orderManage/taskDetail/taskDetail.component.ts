import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../models/constant';
import { NzModalRef } from 'ng-zorro-antd';
import { OrderManageService } from '../orderManage.service';

@Component({
  templateUrl: 'taskDetail.component.html'
})

export class TaskDetailComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  task;
  amount;
  detail: any = {
    customerObj: {},
    currencyTypeList: []
  };
  selectedIndex = 0;
  recordList = [];
  firstRenderFlag = true;
  statusTransitionList = [];
  statusList = [];
  constructor(private orderManageService: OrderManageService,
              private modalRef: NzModalRef) { }

  ngOnInit() {
    this.orderManageService.qryTaskDetail(this.task.taskNo).subscribe(
      result => {
        this.amount = 0;
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        taskDetail.taskDetailList.forEach(item => {
          this.amount = this.amount + item.amount;
          console.log(item.amount);
          item.detailList.forEach(data => {
            item[data.key] = data.value;
          })
        });
        this.detail.currencyTypeList = taskDetail.taskDetailList;
        console.log(this.detail.currencyTypeList);
        this.detail.customerName = taskDetail.customerName;
      }
    );

    this.orderManageService.getServiceDetail(this.task['taskType'])
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
    this.orderManageService.qryOperateRecord(this.task.taskNo)
      .subscribe(result => {
        this.recordList = result['retList'];
      });
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }


  //查询订单明细

}
