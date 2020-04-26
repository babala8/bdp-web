import { NetPointService } from '../../netpoint.service';
import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../../models/constant';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  templateUrl: 'detail.component.html'
})

export class DetailComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  task;
  detail: any = {
    customerObj: {},
    currencyTypeList: []
  };
  selectedIndex = 0;
  recordList = [];
  firstRenderFlag = true;
  statusTransitionList = [];
  statusList = [];
  constructor(private netPointService: NetPointService,
              private modalRef: NzModalRef) { }

  ngOnInit() {
    this.netPointService.qryTaskDetail(this.task.taskNo).subscribe(
      result => {
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        // Object.assign(this.detail.customerObj,taskDetail.customerNoList[0]);
        taskDetail.taskDetailList.forEach(item => {
          item.detailList.forEach(data => {
            item[data.key] = data.value
          })
        });
        this.detail.currencyTypeList = taskDetail.taskDetailList;
        this.detail.customerName = taskDetail.customerName;
      }
    );

    this.netPointService.getServiceDetail(this.task['taskType'])
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
    this.netPointService.qryOperateRecord(this.task.taskNo)
      .subscribe(result => {
        this.recordList = result['retList'];
      });
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }
}
