import { NetPointService } from '../../netpoint.service';
import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../../models/constant';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  templateUrl: 'detail.html',
})

export class DetailComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  task;
  detail: any = {
    clrCenterNo: null,
    clrCenterName: null,
    customerName: null,
    containerList: [],
    currencyList: [],
    planFinishDate: null,
    note: null,
    newTaskInfoList:[],
    oldTaskInfoList:[]
  };
  selectedIndex = 0;
  recordList = [];
  firstRenderFlag = true;
  statusTransitionList = [];
  statusList = [];
  detailList = [];
  constructor(private service: NetPointService, private modalRef: NzModalRef) {
  }

  ngOnInit() {
    this.service.qryTaskDetail(this.task.taskNo).subscribe(
      result => {
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        taskDetail.taskDetailList.forEach(item => {
          item.detailList.forEach(data => {
            item[data.key] = data.value;
          });
        });
        taskDetail.taskEntityPOList.forEach(item => {
          item.taskEntityDetailDTOList.forEach(data => {
            item[data.key] = data.value;
          });
        });
        this.detail.containerList = taskDetail.taskEntityPOList;
        this.detail.currencyList = taskDetail.taskDetailList;
        this.detail.newTaskInfoList = taskDetail.taskHistory.newTaskInfoList;
        this.detail.oldTaskInfoList = taskDetail.taskHistory.oldTaskInfoList;

      },
    );

    this.service.getServiceDetail(this.task['taskType'])
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
    this.service.qryOperateRecord(this.task.taskNo)
      .subscribe(result => {
        this.recordList = result['retList'];
      });
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }
}
