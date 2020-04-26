import {Component, OnInit} from '@angular/core';
import {Page} from "../../../models/page";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {AppService} from "../../../app.service";
import {HttpResponse} from "@angular/common/http";
import {SYS_CONS} from "../../../models/constant"
import * as _ from 'lodash';
import { AuditComponent } from "./audit/audit.component";
import { SelectCashboxComponent } from "./select-cashbox/select-cashbox.component";
import { OutDetailComponent } from "./out-detail/out-detail.component";
import { StorageCenterService } from "../storage-center.service";

@Component({
  selector: 'app-out-task',
  templateUrl: './out-task.component.html',
})
export class OutTaskComponent implements OnInit {

  page = new Page();
  loading = true;
  dataSet = [];
  formModel = {};
  taskType = SYS_CONS.TASK_TYPE;
  states = SYS_CONS.STATE.NOTES_RECEIPT_TASK;
  expandForm;

  constructor(private modal: NzModalService,
              private appService: AppService,
              private message: NzMessageService,
              private service: StorageCenterService) {
  }

  ngOnInit() {
    this.reset();
  }

  refreshData(reset = false) {
    this.loading = true;
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      taskType: this.formModel['taskType'] || 8,
      taskNo: this.formModel['taskNo'] && this.formModel['taskNo'].trim() || '',
      lineName: this.formModel['lineName'] && this.formModel['lineName'].trim() || '',
      curPage: this.page.curPage,//当前页码
      pageSize: this.page.pageSize,//每页条数
    };
    this.expandForm = params.taskType === 8 ? false: true;
    this.service.getGoodOutOrder(params)
      .subscribe(_data => {
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        console.log(error);
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  openDetail(data) {
    this.modal.create({
      nzTitle: '库存详情',
      nzFooter: null,
      nzWidth: '60%',
      nzContent: OutDetailComponent,
      nzComponentParams: {
        data: data
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

  reset() {
    Object.assign(this.formModel, {
      clrCenterNo: null,
      taskNo: null,
      taskType: null,
      lineName: null
    });
    this.refreshData(true);
  }

  _allChecked = false;
  _indeterminate = false;
  selectItem: Array<any> = [];

  _refreshStatus() {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnchecked = this.dataSet.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnchecked)
  }

  changeItem(event, data) {
    let hasElement = _.filter(this.selectItem, {taskNo: data.taskNo}).length > 0;
    if (!hasElement && event) {
      this.selectItem.push(data);
    } else if (hasElement && !event) {
      _.pullAllBy(this.selectItem, [{'taskNo': data.taskNo}], 'taskNo');
    }
  }

  outWarehouse() {
    // 获取任务单列表
    const arr = this.dataSet.filter(item => {
      return item.checked;
    }).map(item1 => {
      console.log(item1.taskNo);
      // return item1.taskNo;
      return item1.taskNo
    });
    console.log(arr);

    // 批量出库参数
    const outWarehouseBatch = {
      "taskType": this.formModel['taskType'],
      "operateType": "WuLiuChuKu",
      "list":arr
    };
    this.service.outWarehouseBatch(outWarehouseBatch)
      .subscribe(data => {
        this.loading = false;
        // this.nzModal.triggerOk();
        this.message.success(
          `批量出库成功`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }


  // 打开审核模态框
  openAudit(task) {
    this.modal.create({
      nzTitle: '任务单审核',
      nzContent: AuditComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        taskNo: task.taskNo,
      },
      nzOnOk: () => this.refreshData(),
    });
  }

  // 打开绑定款箱模态框
  openSelectCashBox(data){
    this.modal.create({
      nzTitle: '款箱列表',
      nzFooter: null,
      nzWidth: '60%',
      nzContent: SelectCashboxComponent,
      nzComponentParams: {
        data: data
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
}
