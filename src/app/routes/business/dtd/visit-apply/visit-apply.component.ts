import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../../models/page';
import { VisitApplyService } from './visit-apply.service';
import { VisitApplyAddComponent } from './visit-apply-add/visit-apply-add.component';
import { VisitApplyModComponent } from './visit-apply-mod/visit-apply-mod.component';

@Component({
  templateUrl: './visit-apply.html',
})
export class VisitApplyComponent implements OnInit {

  formModel: {
    id?: string,
    startDate?: Date,
    endDate?: Date,
    orderTimePeriod?: string
  } = {};
  auditItem;
  loading = false;
  dataList = [];
  page = new Page();
  dateRange = [];
  visitOrderList = [];
  timePeriodList = [
    { value: '1', label: '上午' },
    { value: '2', label: '下午' },
  ];
  statusList = [
    { value: '0', label: '待审核' },
    { value: '1', label: '金库人员已审核' },
    { value: '2', label: '审核不通过' },
  ];

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private visitOrderService: VisitApplyService,
  ) {
  }

  onDateChange(result: Date): void {
    this.formModel['startDate'] = result[0];
    this.formModel['endDate'] = result[1];
  }

  ngOnInit(): void {
    this.qryCustomerOrder();
    this.reset();
  }

  reset() {
    this.formModel = {
      id: null,
      startDate: null,
      endDate: null,
      orderTimePeriod: null,
    };
    this.dateRange = [];
    this.refreshData(true);
  }

  search() {
    this.refreshData(true);
  }

  // 查询上门预约信息列表
  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      id: this.formModel['id'] ? this.formModel['id'] : '',
      startDate: this.formModel['startDate'] ? this.formModel['startDate'].format('YYYY-MM-DD') : '',
      endDate: this.formModel['endDate'] ? this.formModel['endDate'].format('YYYY-MM-DD') : '',
      orderTimePeriod: this.formModel['orderTimePeriod'] ? this.formModel['orderTimePeriod'] : '',
    };
    Object.assign(params, this.page);
    this.loading = true;
    this.visitOrderService.qryVisitOrderByPage(params)
      .subscribe(data => {
        this.dataList = data['retList'];
        this.page.totalRow = data['totalRow'];
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  //打开添加模态框
  openAdd() {
    const nzModalSubject = this.modal.create({
      nzTitle: '添加上门预约信息',
      nzMaskClosable: false,
      nzFooter: null,
      // nzWidth: '60%',
      // nzZIndex: 990,
      nzContent: VisitApplyAddComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  //打开修改模态框
  openMod(visitOrder) {
    const nzModalSubject = this.modal.create({
      nzTitle: '修改上门预约信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzComponentParams: {
        visitOrder: visitOrder,
      },
      nzContent: VisitApplyModComponent,

      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }


  //删除上门预约信息
  del(item) {
    this.visitOrderService.delVisitOrder(item)
      .subscribe(_data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      });
  }

  audit(item) {
    this.auditItem = Object.assign({}, item);
    this.auditItem.status = 1;
    this.visitOrderService.auditVisitOrder(this.auditItem)
      .subscribe(data => {
        this.message.success('审核完成！');
        this.refreshData(true);
      });
  }

  auditFailed(item) {
    this.auditItem = Object.assign({}, item);
    this.auditItem.status = 2;
    this.visitOrderService.auditVisitOrder(this.auditItem)
      .subscribe(data => {
        this.message.success('退回完成！');
        this.refreshData(true);
      });
  }

  qryCustomerOrder() {
    this.visitOrderService.qryVisitOrderList()
      .subscribe(result => {
        this.visitOrderList = result['retList'];
      });
  }

  matchCustomerName2ID(visitOrderList) {
    this.formModel['id'] = visitOrderList;
  }

}
