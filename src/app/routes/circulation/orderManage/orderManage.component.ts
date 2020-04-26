import { Component, OnInit } from '@angular/core';
import { OrderManageService } from './orderManage.service';
import { Page } from '../../../models/page';
import { NzModalService } from 'ng-zorro-antd';
import { DistributeLineComponent } from './distributeLine/distributeLine.component';
import { TaskDetailComponent } from './taskDetail/taskDetail.component';

@Component({
  templateUrl: 'orderManage.component.html'
})

export class OrderManageComponent implements OnInit {
  taskList;
  formModel: any = {};
  expandForm = false;
  loading = false;
  dataSet = [];
  lineList;
  boxNumList = [];
  serviceList = [
    {
      serviceNo: 1,
      serviceName: '自助加钞任务'
    },
    {
      serviceNo: 2,
      serviceName: '寄库解现任务'
    }
  ];
  page = new Page();

  constructor(private orderManageService: OrderManageService,
              private modal: NzModalService) {

  }

  ngOnInit(): void {
    this.refreshData(true);
    this.getLineList();

  }

  // 刷新数据
  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const params = {
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
      clrCenterNo: this.formModel.clrCenterNo ? this.formModel.clrCenterNo : '',
      taskNo: this.formModel.taskNo ? this.formModel.taskNo : '',
      checkAll: 1,
      taskType: this.formModel.serviceNo ? this.formModel.serviceNo : '',
      lineNo: this.formModel.lineNo ? this.formModel.lineNo : '',
      startDate: this.formModel.dateRange ? this.formModel.dateRange[0].format('YYYY-MM-DD') : '',
      endDate: this.formModel.dateRange ? this.formModel.dateRange[1].format('YYYY-MM-DD') : '',
    };
    this.orderManageService.getOrderManage(params)
      .subscribe(data => {
        this.dataSet = data['retList'];
        this.page.totalRow = data['totalRow'];
        this.dataSet.forEach(item => {
          this.getBoxNum(item);
          this.loading = false;
        })
      });
  }

  getLineList() {
    this.orderManageService.qryAllLine({})
      .subscribe(_data => {
        this.lineList = _data.retList;
      });
  }

  reset() {
    this.formModel = {};
    this.refreshData(true);
  }

  getBoxNum(task) {
    this.orderManageService.qryTaskDetail(task.taskNo)
      .subscribe(data => {
        task.outBoxNum = data.retList[0].outBoxNum;
        task.inBoxNum = data.retList[0].inBoxNum;
        console.log(task);
      })
  }

  // 打开详情界面
  openDetail(task) {
    this.modal.create({
      nzTitle: '订单详情',
      nzContent: TaskDetailComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        task: task
      }
    });
  }

  distributeLine(task) {
    this.modal.create({
      nzTitle: '线路分配——订单' + task.taskNo,
      nzContent: DistributeLineComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzComponentParams: {
        task: task
      },
      nzOnOk: () => this.refreshData(true),
    })
  }
}
