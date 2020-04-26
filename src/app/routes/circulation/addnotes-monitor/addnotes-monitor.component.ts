import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { AppService } from "../../../app.service";
import { Page } from "../../../models/page";
import { SYS_CONS } from './../../../models/constant';
import { CirculationService } from '../circulation.service';
import { AddnotesMonitorMapComponent } from './tauro-map/addnotes-monitor-map.component';

@Component({
  selector: 'app-addnotes-monitor',
  templateUrl: './addnotes-monitor.component.html'
})

export class AddnotesMonitorComponent implements OnInit {

  data;
  validateForm;
  formModel = {};
  dataList = []; // 流转任务信息
  dataSet = [];
  loading = true;
  page = new Page();
  statusList = SYS_CONS.STATE.ADDNOTE_TASK;
  lineList = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private appService: AppService,
    private message: NzMessageService,
    private service: CirculationService
  ) {
  }

  ngOnInit() {
    this.reset();
    this.service.getLineListByClrNo('028001').subscribe(
      result => this.lineList = result.retList
    )
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }

    const params = {
      opNo: this.formModel['addnotesOpNo'] && this.formModel['addnotesOpNo'].trim() || '', // 加钞人员编号
      taskNo: this.formModel['dispatchNo'] && this.formModel['dispatchNo'].trim() || '', // 任务单编号
      lineNo: this.formModel['lineNo'] && this.formModel['lineNo'].trim() || '',
      curPage: this.page.curPage, // 当前页码
      pageSize: this.page.pageSize, // 每页条数
      taskType: '1'
    };
    this.loading = true;
    this.service.getDispatchCirculation(params)
      .subscribe(_data => {
        this.dataList = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        console.log(_data['totalRow']);
        this.page.totalPage = _data['totalPage'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  reset() {
    this.formModel['addnotesOpNo'] = null;
    this.formModel['dispatchNo'] = null;
    this.formModel['lineNo'] = null;
    this.refreshData(true);
  }

  openMap(data) {
    this.modal.create({
      nzTitle: '流转任务实时监控',
      nzFooter: null,
      nzWidth: '90%',
      nzContent: AddnotesMonitorMapComponent,
      nzComponentParams: {
        dataParams: data
      },
      nzOnOk: () => {
        // 【成功时】，刷新数据，并回到第一页
        this.refreshData(true);
      },
      nzOnCancel: () => {
        // 一般情况，【取消时】，什么都不做
      },
    });
  }

  isShow(status) {
    for (let i = 6; i < SYS_CONS.STATE.ADDNOTE_TASK.length; i++) {
      if (status === SYS_CONS.STATE.ADDNOTE_TASK[i].value) {
        return true;
      }
    }
    return false;
  }
}
