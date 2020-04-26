import { Component, OnInit } from '@angular/core';
import {Page} from "../../../models/page";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ClearCenterService } from '../clear-center.service';
import { SorterDistributeComponent } from './component/allocation-task-branch.component';

@Component({
  selector: 'app-allocation-task',
  templateUrl: './allocation-task.component.html',
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
export class AllocationTaskComponent implements OnInit {

  loading = true;
  dataList = [];
  dataSet = [];
  dataSet1 = [];
  dataSet2 = [];
  dataSet3 = [];
  dataSet4 = [];
  dataSet5 = [];
  dataSet6 = [];
  formModel = {};
  page = new Page();
  title2 = '② 配款中';
  title3 = '③ 待入库交接';
  title4 = '④ 待入库';
  title5 = '⑤ 入库中';
  title6 = '⑥ 已入库';

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private service: ClearCenterService
  ) { }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.refreshData(true);
  }

  refreshData(reset = false) {
    this.loading = true;

    this.qryTaskInfoFunc("dataSet1",{operateType: "FenPeiPeiKuan"});
    this.qryTaskInfoFunc("dataSet2",{operateType: "LoadNote"});
    this.qryTaskInfoFunc("dataSet3",{operateType: "ChaoChuRuKuJiaoJie"});
    this.qryTaskInfoFunc("dataSet4",{operateType: "ChaoChuRuKu"});
    this.qryTaskInfoFunc("dataSet5",{operateType: "MenJinShenHeRuKu"});
    this.qryTaskInfoFunc("dataSet6",{operateType: "WuLiuChuKu"});

  }

  // 批量查询任务信息
  qryTaskInfoFunc(dataSet, param){
    this.service.qryTaskInfo(param).subscribe(_data => {
      this[dataSet] = _data['element']['retList'];
      this.loading = false;
    }, (error) => {
      this.loading = false;
    })
  }



  _allChecked = false;
  _indeterminate = false;

  _refreshStatus() {
    const allChecked = this.dataList.every(value => value.checked === true);
    const allUnChecked = this.dataList.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  openSorterDistribute(){
    // 获取任务单列表
    const str = this.dataSet1.filter(item => {
      return item.checked;
    }).map(item1 => {
      console.log(item1.taskNo);
      return item1.taskNo;
    }).join(',');

    if (!str.length){
      return this.message.warning("请先选择任务单");
    }

    this.modal.create({
      nzTitle: '清分机分配',
      nzWidth: '80%',
      nzFooter: null,
      nzContent: SorterDistributeComponent,
      nzComponentParams: {
        data: str
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
    });
  }
}
