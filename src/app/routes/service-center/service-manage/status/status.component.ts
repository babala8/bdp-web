import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/routes/common.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ServiceCenterService } from './../../service-center.service';
import { ServiceManageService } from '../service-manage.service';

/**
 * @description 服务状态管理
 * @export
 * @class StatusComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit {
  serviceInfo;
  statusList = [];
  statusSelectedList = [
    { status: 201, name: '已创建' },
    { status: 202, name: '已退回' },
    { status: 204, name: '已审批' },
    { status: 205, name: '已完成' },
    { status: 206, name: '已拆分' },
    { status: 207, name: '金库已确认' },
    { status: 208, name: '已过期' },
    { status: 209, name: '已合并' },
    { status: 305, name: '经警已接库' },
    { status: 306, name: '已入库交接' },
    { status: 308, name: '已入库' },

  ];
  statusObj = {};
  serviceInfoDetail: any = {};
  loading = false;
  constructor(
    private serviceManageService: ServiceManageService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.initData();
    this.statusSelectedList.forEach(s => {
      this.statusObj[s.status] = s.name;
    })
  }

  // 查询服务详情
  initData(): void {
    this.serviceManageService.getServiceDetail(this.serviceInfo.serviceNo)
      .subscribe(result => {
        this.serviceInfoDetail = result;
        this.statusList = result['statusList'];
      })
  }

  // 变更修改状态
  changeEditFlag(item) {
    item.editFlag = !item.editFlag;
    item.name = this.statusObj[item.status];
  }

  // 删除状态
  deleteStatus(index) {
    this.statusList.splice(index, 1);
    this.statusList = [...this.statusList];
  }
  // 新增状态行
  addStatus() {
    this.statusList = [...this.statusList, { editFlag: true }];
  }

  // 提交状态信息
  submitChanges() {
    this.statusList.forEach(status => {
      status.serviceNo = this.serviceInfoDetail.serviceNo
    });
    this.loading = true;
    this.serviceManageService.statusManage(this.statusList)
      .subscribe(result => {
        this.message.success('修改状态码信息成功');
        this.loading = false;
        this.modalRef.triggerOk();
      }, err => {
        this.loading = false;
      })

  }
}
