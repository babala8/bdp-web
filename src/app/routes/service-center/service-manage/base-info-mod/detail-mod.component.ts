import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ServiceManageService } from '../service-manage.service';
import { SYS_CONS } from "../../../../models/constant";

/**
 * 服务基本信息修改
 */
@Component({
  templateUrl: './detail-mod.component.html'
})
export class DetailModComponent implements OnInit {
  validateForm: FormGroup;
  customerTypeList = []; // 服务对象列表
  serviceInfo; // 服务信息
  loading = false;
  MERGE_FLAG = SYS_CONS.MERGE_FLAG; // 任务单是否可合并标志

  constructor(
    private fb: FormBuilder,
    private serviceManageService: ServiceManageService,
    private message: NzMessageService,
    private nzModalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.qryCustomerList();
    this.validateForm = this.fb.group({
      serviceNo: [this.serviceInfo.serviceNo, [Validators.required]],
      serviceName: [this.serviceInfo.serviceName, [Validators.required]],
      customerType: [this.serviceInfo.customerType, [Validators.required]],
      mergeFlag: [this.serviceInfo.mergeFlag, [Validators.required]],
      note: [this.serviceInfo.note],
    })
  }

  // 查询所有服务对象
  qryCustomerList() {
    this.serviceManageService.qryCustomerTypeList()
      .subscribe(result => {
        this.customerTypeList = result['retList'];
      })
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  // 提交
  submitForm() {
    // 用户输入校验
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }

    this.loading = true;
    const params = {...this.validateForm.value};
    this.serviceManageService.modServiceBaseInfo(params).subscribe(
      (_data) => {
        this.loading = false;
        this.message.success(_data['retMsg']);
        this.nzModalRef.triggerOk();
      }, err => {
        this.loading = false;
        this.message.error(err.body.retMsg);
      })
  }
}
