import { NetPointService } from '../../netpoint.service';
import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../../models/constant';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  templateUrl: 'split.component.html'
})

export class SplitAllocationComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  taskNo;
  detail: any = {
    clrCenterNo: null,
    customer: {
      name: null,
      containerList: [],
      currencyList: []
    },
    planFinishDate: null,
    note: null,

  };
  originList: any = [];   // 原申请单钞箱列表，此列表不做改动，用来进行一键还原操作
  splitList: any = [];    // 拆分的结果列表
  editList: any = [];   // 用来作拆分的列表
  orgDetail;
  loading = false;
  constructor(private netPointService: NetPointService,
              private modalRef: NzModalRef,
              private message: NzMessageService) { }

  ngOnInit() {
    console.log(this.taskNo);
    this.netPointService.qryTaskDetail(this.taskNo).subscribe(
      result => {
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        this.originList = [...taskDetail.customerNoList[0].containerNoList];
        this.editList = [...taskDetail.customerNoList[0].containerNoList];
        this.getCustomerName(taskDetail.customerNoList[0].customerNo);
      }
    );
  }

  getCustomerName(orgNo) {
    this.netPointService.qryOrgDetail(orgNo).subscribe(
      result => this.detail.customer.name = result.name
    );
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  // 添加拆分分组
  addSplitGroup($event: MouseEvent) {
    $event.stopPropagation();
    const checkedList = this.editList.filter(item => {
      return item.checked;
    });
    this.editList = this.editList.filter(item => {
      return !item.checked;
    });
    checkedList.forEach(item => {
      item.checked = false;
    });
    if (checkedList.length === 0) {
      this.message.warning('未选中任何款箱信息');
      return;
    }
    this.splitList.push(checkedList);
  }

  // 还原指定分组
  resetSplitGroup(index) {
    this.editList = [...this.editList, ...this.splitList[index]];
    this.splitList.splice(index, 1);
  }

  // 还原所有分组
  resetAllSplitGroup($event: MouseEvent) {
    $event.stopPropagation();
    this.splitList = [];
    this.editList = [...this.originList];
  }

  // 确认拆分订单
  confirmSplit() {
    const taskSplitContainerLists = this.splitList.map(item => {
      return {taskSplitContainers: item};
    });
    this.loading = true;
    const params = {};
    Object.assign(params, this.detail, {
      nextStatus: 206,
      taskSplitContainerLists: taskSplitContainerLists,
      customerNo: this.detail.customerNoList[0].customerNo,
      customerType: this.detail.customerNoList[0].customerType,
    });
    this.netPointService.splitAllocation(params)
      .subscribe(result => {
        this.loading = false;
        this.message.success('拆分成功');
        this.modalRef.triggerOk();
      }, err => {
        this.loading = false;
      })

  }
}
