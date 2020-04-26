import { Component, OnInit } from '@angular/core';
import { Page } from '../../../models/page';
import { AbnormalTaskService } from './abnormal-task.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { DetailComponent } from '../clear-center/callout-manage/detail/detail.component';
import { OperateCompoment } from './operate/operate.compoment';

@Component({
  templateUrl: './abnormal-task.html',
})
export class AbnormalTaskComponent implements OnInit {
  formModel: any = {};
  expandForm = false;
  loading = false;
  dataSet = [];
  page = new Page();
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

  constructor(private abnormalTaskService: AbnormalTaskService,
              private message: NzMessageService,
              private modal: NzModalService) {

  }

  ngOnInit(): void {
    // this.refreshData(true);
  }
  
  // 查询所有任务单类型
  // getServiceList() {
  //   this.abnormalTaskService.qryServiceList({})
  //     .subscribe(_data => {
  //       this.serviceList = _data['retList'];
  //     })
  // }

  // 查询列表
  refreshData(reset = false) {
    // 刷新数据
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      clrCenterNo: this.formModel.clrCenterNo ? this.formModel.clrCenterNo : '',
      taskNo: this.formModel.taskNo ? this.formModel.taskNo : '',
      taskType: this.formModel.serviceNo ? this.formModel.serviceNo: '',
      startDate: this.formModel.dateRange ? this.formModel.dateRange[0].format('YYYY-MM-DD') : '',
      endDate: this.formModel.dateRange ? this.formModel.dateRange[1].format('YYYY-MM-DD') : '',
    };
    Object.assign(params, this.page);
    this.loading = true;
    this.abnormalTaskService.qryTaskListByPage(params)
      .subscribe(result => {
        this.loading = false;
        this.page.totalRow = result['totalRow'];
        this.dataSet = result['retList'];
      }, err => {
        this.loading = false;
      });
  }

  // 强制结束任务
  stopTaskForce(taskNo) {
    this.abnormalTaskService.stopTaskForce({taskNo, operateTypeFlag: '1'})
      .subscribe(data => {
        this.message.success('终止任务成功');
        this.refreshData(false);
      })
  }

  // 打开手工操作界面
  openOperate(task) {
    this.modal.create({
        nzTitle: '调出详情',
        nzContent:OperateCompoment ,
        nzFooter: null,
        nzWidth: 1024,
        nzComponentParams: {
          task: task,
        },
        nzOnOk: () => {
          this.refreshData(false);
        },
    });
  }

  reset() { }
}
