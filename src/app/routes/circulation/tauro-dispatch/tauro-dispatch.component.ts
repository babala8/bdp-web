import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { AppService } from "../../../app.service";
import { TauroDispatchService } from "./tauro-dispatch.service";
import { Page } from "../../../models/page";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { DetailTauroDispatchComponent } from './detail/detail-tauro-dispatch.component';

@Component({
  selector: 'app-dispatch-circulation',
  templateUrl: './tauro-dispatch.component.html'
})

export class TauroDispatchComponent implements OnInit {

  data;
  validateForm;
  formModel = {};
  dataList = []; // 流转任务信息
  dataSet = [];
  loading = true;
  page = new Page();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private appService: AppService,
    private message: NzMessageService,
    private tauroDispatchService: TauroDispatchService
  ) {
  }

  ngOnInit() {
    this.reset();
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }

    const params = {
      addnotesOpNo: this.formModel['addnotesOpNo'] && this.formModel['addnotesOpNo'].trim() || '', //加钞人员编号
      dispatchNo: this.formModel['dispatchNo'] && this.formModel['dispatchNo'].trim() || '', //任务单编号
      curPage: this.page.curPage, //当前页码
      pageSize: this.page.pageSize, //每页条数
    };
    this.loading = true;
    this.tauroDispatchService.getDispatchCirculation(params)
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
    this.refreshData(true);
  }

  openDetail(data) {

    this.modal.create({
      nzTitle: '流转信息详细',
      nzFooter: null,
      nzWidth: '80%',
      nzContent: DetailTauroDispatchComponent,
      nzComponentParams: {
        // 若返回记录有多条则默认取第1条记录，若返回的列表为空则传递空对象
        data: data
      },
      nzOnOk: () => {
        // 【成功时】，刷新数据，并回到第一页
      },
      nzOnCancel: () => {
        // 一般情况，【取消时】，什么都不做
      },
    });


  }

}
