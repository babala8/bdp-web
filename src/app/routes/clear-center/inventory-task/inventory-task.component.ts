import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../../../models/page';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ClearCenterService } from '../clear-center.service';
import { ClearingMachineDistributeComponent } from './component/Clearing-machine-distribute.component';
import {OPERATETYPE} from "../../../models/constant";

/**
 * 钞处中心 清点任务管理
 */
@Component({
  selector: 'app-inventory-task',
  templateUrl: './inventory-task.component.html',
  styles: [`
    :host ::ng-deep .ant-table-content {
      height: 300px;
      background-color: #ffffff;
    }
    :host ::ng-deep .ant-table-placeholder {
      border-bottom: 0 !important;
    }
    :host ::ng-deep .ant-table-title {
      height: 50px;
      background-color: lightgrey;
    }
  `]
})
export class InventoryTaskComponent implements OnInit {

  loading = true;
  dataList = [];
  dataSet = [];
  daiChuKuDataSet = [];
  daiFenPeiDataSet = [];
  daiKuFangQueRenDataSet = [];
  chuKuZhongDataSet = [];
  daiJiaoJieDataSet = [];
  qingDianZhongDataSet = [];
  yiQingDianDataSet = [];
  formModel = {};
  page = new Page();
  daiKuFangQueRenTitle = '② 待库房确认';
  chuKuZhongTitle = '③ 出库中';
  daiJiaoJieTitle = '④ 待交接';
  qingDianZhongTitle = '⑥ 清点中';
  yiQingDianTitle = '⑦ 已清点';
  expandForm;

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private service: ClearCenterService,
  ) {
  }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.formModel['taskNo'] = null;
    this.formModel['clrCenterNo'] = null;
    this.formModel['lineNo'] = null;
    this.formModel['dateRange'] = null;
    this.refreshData(true);
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
    };
    this.expandForm = params.taskType !== 8;

    this.getTaskInfo("daiChuKuDataSet",{operateType: OPERATETYPE.ChaoChuShenQingChuKu});
    this.getTaskInfo("daiKuFangQueRenDataSet",{operateType: OPERATETYPE.ChaoChuChuKu});
    this.getTaskInfo("chuKuZhongDataSet",{operateType: OPERATETYPE.MenJinShenHeChuKu});
    this.getTaskInfo("daiJiaoJieDataSet",{operateType: OPERATETYPE.ChaoChuChuKuJiaoJie});
    this.getTaskInfo("daiFenPeiDataSet",{operateType: OPERATETYPE.FenPeiQingDian});
    this.getTaskInfo("qingDianZhongDataSet",{operateType: OPERATETYPE.QingDian});
    this.getTaskInfo("yiQingDianDataSet",{operateType: OPERATETYPE.Finish});
  }

  _allChecked = false;
  _indeterminate = false;

  _refreshStatus() {
    const allChecked = this.daiFenPeiDataSet.every(value => value.checked === true);
    const allUnChecked = this.daiFenPeiDataSet.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  _refresh() {
    const allChecked = this.daiChuKuDataSet.every(value => value.checked === true);
    const allUnChecked = this.daiChuKuDataSet.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  /**
   * 申请出库
   */
  applyOut() {
    // 获取任务单列表
    const arr = this.daiChuKuDataSet.filter(item => {
      return item.checked;
    }).map(item1 => {
      return item1.taskNo;
    });
    console.log(arr);
    if (!arr.length) return this.message.warning('请选择需要出库的计划！');

    // 批量出库参数
    const outWarehouseBatch = {
      'taskType': '2',
      'operateType': OPERATETYPE.ChaoChuShenQingChuKu,
      'list': arr,
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

  /**
   * 分配清分机
   */
  openSorterDistribute() {
    const selectedArr = this.daiFenPeiDataSet.filter(item => {
      return item.checked;
    }).map(item1 => {
      return item1.taskNo;
    }).join(',');
    console.log(selectedArr);
    if (!selectedArr.length) {
      return this.message.warning('请选择需要清分的计划！');
    }

    this.modal.create({
      nzTitle: '清分机分配',
      nzWidth: '80%',
      nzContent: ClearingMachineDistributeComponent,
      nzComponentParams: {
        taskList: selectedArr,
      },
      nzFooter: null,
      nzOnOk: () => {
      },
    });
  }

  /**
   * 钞处中心待执行任务信息查询
   * @param dataSet 结果集
   * @param operateType 操作类型
   */
  getTaskInfo(dataSet, operateType) {
    this.service.getTaskInfo(operateType).subscribe(_data => {
      this[dataSet] = _data['element']['retList'];
      this.loading = false;
    }, (error1 => {
      this.loading = false;
    }));
  }
}
