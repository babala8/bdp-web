import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../../models/page';
import { ApplyAddComponent } from './apply/apply-add.component';
import { SYS_CONS } from '../../../../models/constant';
import { ApplyDetailComponent } from './detail/apply-detail.component';
import { CommonService } from '../common.service';
import { ServiceSelectComponent } from './service-select/service-select.component';

@Component({
  templateUrl: './common-apply.html',
})
export class CommonApplyComponent implements OnInit {
  formModel: any = {};
  loading = false;
  commonApplyList = [];
  page = new Page();
  states = SYS_CONS.STATE.SELF_PRODUCT_TASK;
  taskTypeList = [];

  constructor(private modal: NzModalService,
              private commonService: CommonService) {

  }

  ngOnInit(): void {
    this.qryTaskTypeList();
    this.refreshData(true);
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      productType: 1,
    };
    Object.assign(params, this.page, this.formModel, {
      startDate: this.formModel.dateRange ? this.formModel.dateRange[0].format('YYYY-MM-DD') : '',
      endDate: this.formModel.dateRange ? this.formModel.dateRange[1].format('YYYY-MM-DD') : '',
      taskType: this.formModel['taskType'] ? this.formModel['taskType'] : '',
    });
    this.commonService.qryCommonApplyList(params)
      .subscribe(result => {
        this.commonApplyList = result['retList'];
        this.page.totalRow = result['totalRow'];
      });
  }

  reset() {
    this.formModel = {};
  }

  // 查询任务单类型列表
  qryTaskTypeList() {
    this.commonService.qryServiceForUse({})
      .subscribe(result => {
        this.taskTypeList = result['retList'];
      })
  }

  // 打开要添加的产品的选择界面
  openProdSelect() {
    this.modal.create({
      nzTitle: '选择添加产品',
      nzWidth: '1100px',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: ServiceSelectComponent,
      nzClassName: 'zi-modal',
      nzOnOk: result => {
        this.openApplyAdd(result.serviceDetail);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 打开添加产品模态框（注：这是选择添加产品类型下一步）
  openApplyAdd(serviceDetail) {
    this.modal.create({
      nzTitle: `添加${serviceDetail.serviceName}申请单`,
      nzWidth: '1100px',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: ApplyAddComponent,
      nzZIndex: 100,
      nzComponentParams: {
        serviceDetail: serviceDetail,
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 打开详情界面
  openDetail(taskNo) {
    this.modal.create({
      nzTitle: '申请单详情',
      nzContent: ApplyDetailComponent,
      nzFooter: null,
      nzWidth: '1100px',
      nzClassName: 'zj-modal',
      nzComponentParams: {
        taskNo: taskNo
      }
    });
  }
}

