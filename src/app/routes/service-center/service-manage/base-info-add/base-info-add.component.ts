import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ServiceManageService } from '../service-manage.service';

/**
 * @description 添加服务
 * @export
 * @class BaseInfoAddComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './base-info-add.component.html'
})
export class BaseInfoAddComponent implements OnInit {
  validateForm: FormGroup;
  customerTypeList = [];    // 服务对象列表
  loading = false;

  constructor(
    private fb: FormBuilder,
    private serviceManageService: ServiceManageService,
    private message: NzMessageService,
    private nzModalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.qryCustomerList();
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      customerType: [null, [Validators.required]],
      mergeFlag: [null, [Validators.required]], // 是否可合并
      note: [null, [Validators.required, Validators.maxLength(100)]],
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

  submitForm() {
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
    this.serviceManageService.addservice(params)
      .subscribe(() => {
        this.message.success('添加服务成功！');
        this.loading = false;
        this.nzModalRef.triggerOk();
      }, err => {
        this.loading = false;
        if (err instanceof HttpResponse) {
          this.message.error(err.body.retMsg);
        }
      })
  }
}

