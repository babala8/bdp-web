import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  templateUrl: './devCompany-detail.html',
})

export class DevCompanyDetailComponent implements OnInit {
  validateForm: FormGroup;
  devCompanyInfo;

  constructor(private fb: FormBuilder,
              private nzModal: NzModalRef
  ) {
  }

  ngOnInit(): void {
    console.log();
    this.validateForm = this.fb.group({
      no: [{ value: this.devCompanyInfo.no, disabled: true }],
      name: [{ value: this.devCompanyInfo.name, disabled: true }],
      linkman: [{ value: this.devCompanyInfo.linkman, disabled: true }],
      address: [{ value: this.devCompanyInfo.address, disabled: true }],
      phone: [{ value: this.devCompanyInfo.phone, disabled: true }],
      mobile: [{ value: this.devCompanyInfo.mobile, disabled: true }],
      fax: [{ value: this.devCompanyInfo.fax, disabled: true }],
      email: [{ value: this.devCompanyInfo.email, disabled: true }],
    });
  }

  _submitForm() {
    this.nzModal.destroy('onCancel');
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
