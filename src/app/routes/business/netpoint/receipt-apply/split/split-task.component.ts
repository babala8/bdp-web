import { NetPointService } from '../../netpoint.service';
import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../../models/constant';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { CashAddComponent } from "../cash-add/cash-add.modal";

@Component({
  templateUrl: 'split-task.component.html'
})

/**
 * 网点领现任务单-任务单拆分功能
 */
export class SplitTaskComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  taskNo;
  detail: any = {
    clrCenterNo: null,
    planFinishDate: null,
    note: null,
    currencyList: [], // 现金明细
  };
  taskInfo; //由上一个页面带过来的信息
  splitList: any = [];    // 拆分的结果列表
  listOfData = []; // 某次分组的结果
  loading = false;
  constructor(private netPointService: NetPointService,
              private modalRef: NzModalRef,
              private modal: NzModalService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.netPointService.qryTaskDetail(this.taskInfo.taskNo).subscribe(
      result => {
        const taskDetail = result.retList[0];
        Object.assign(this.detail, taskDetail);
        taskDetail.taskDetailList.forEach(item => {
          item.detailList.forEach(data => {
            item[data.key] = data.value
          })
        });
        this.detail.currencyList = taskDetail.taskDetailList;
      }
    );
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  // 添加拆分分组
  addSplitGroup() {
    this.modal.create({
      nzTitle: '任务单拆分-新任务单添加具体领用',
      nzContent: CashAddComponent,
      nzComponentParams: {
        upperDeminationList: [],
      },
      nzWidth: 1024,
      nzZIndex: 199,
      nzFooter: null,
      nzClassName: 'zj-modal',
      nzOnOk: result => {
        this.listOfData = result.cashbox; // 每次的拆分结果
        this.splitList = [...this.splitList,...[this.listOfData]];
      }
    });
  }

  // 还原指定分组
  resetSplitGroup(index) {
    this.splitList.splice(index, 1);
  }

  // 还原所有分组
  resetAllSplitGroup($event: MouseEvent) {
    $event.stopPropagation();
    this.splitList = [];
    this.listOfData = [];
  }

  // 确认拆分订单
  confirmSplit() {
    const taskSplitProductList = this.splitList.map(item => {
      return {taskSplitProductList: item};
    });
    this.loading = true;
    const params = {};
    Object.assign(params, this.detail, {
      taskSplitList: taskSplitProductList,
      direction: 2,
      urgentFlag: 0,
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
