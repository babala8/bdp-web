import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ServiceProviderService} from "../../service-provider.service";

@Component({
  templateUrl: './escort-company-mod.html'
})
export class EscortCompanyModComponent implements OnInit{
  validateForm: FormGroup;
  loading = false;
  provider;

  constructor(private modal: NzModalRef,
              private message: NzMessageService,
              private providerService: ServiceProviderService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      no: [this.provider.no, []],
      name: [this.provider.name, [Validators.required,Validators.pattern("[\u4e00-\u9fa5_a-zA-Z0-9_]{4,20}")]],
      linkman: [this.provider.linkman, [Validators.required,Validators.pattern("^[\u4E00-\u9FA5\uf900-\ufa2d]{2,5}$")]],
      mobile: [this.provider.mobile, [Validators.required,Validators.pattern("^(\\(\\d{3,4}\\)|\\d{3,4}-|\\s)?\\d{7,14}$")]],

    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }
    const params = {};
    Object.assign(params, this.validateForm.value, {type: 2});
    this.loading = true;
    this.providerService.modProvider(params)
      .subscribe(data => {
        this.loading = false;
        this.modal.triggerOk();
        this.message.success(
          `修改服务商成功！`
        );
      }, err => {
        this.loading = false;
      });
  }
}
