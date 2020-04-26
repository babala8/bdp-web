import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ServiceManageService } from '../service-manage.service';
import { SYS_CONS } from "../../../../models/constant";

/**
 * 服务状态信息修改
 */
@Component({
  templateUrl: './status-mod.component.html'
})
export class StatusModComponent implements OnInit {
  validateForm: FormGroup;
  serviceNo;
  statusInfo; // 服务的状态信息
  loading = false;
  MERGE_FLAG = SYS_CONS.MERGE_FLAG; // 任务单是否可合并标志

  constructor(
    private fb: FormBuilder,
    private serviceManageService: ServiceManageService,
    private message: NzMessageService,
    private nzModalRef: NzModalRef
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      status: [this.statusInfo.status, [Validators.required]], // 服务状态码
      name: [this.statusInfo.name, [Validators.required]], // 服务状态名称
      mergeFlag: [this.statusInfo.mergeFlag, [Validators.required]], // 是否可合并标志位
      note: [this.statusInfo.note,], // 服务状态说明
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  // 提交
  submitForm() {
    // 用户校验
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
    const params = {serviceNo:this.serviceNo, ...this.validateForm.value};
    this.serviceManageService.modServiceStatusInfo(params).subscribe(
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

