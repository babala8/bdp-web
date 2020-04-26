import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { ChannelCenterService } from '../../../channel-center.service';
import {SYS_CONS } from '../../../../../models/constant';

@Component({
  templateUrl: './customer-info-add.html',
  styles: [],
})

export class CustomerInfoAddComponent implements OnInit {
  validateForm: FormGroup;
  isOneselfs = [{ 'label': '是', 'value': '1' }, { 'label': '否', 'value': '0' }];
  loading = false;
  callCustomerTypeList = [];

  constructor(private fb: FormBuilder,
              private nzSub: NzModalRef,
              private service: ChannelCenterService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.qryAllLine();
    this.qryAllCallCustomerType();
    this.validateForm = this.fb.group({
      customerShortName: [null, [Validators.required, Validators.maxLength(20)]],
      address: [null, [Validators.required, Validators.maxLength(100)]],
      location: [null, [Validators.required, Validators.maxLength(100)]],
      x: [null, [Validators.required, Validators.pattern('^(\\-|\\+)?(((\\d|[1-9]\\d|1[0-7]\\d|0{1,3})\\.\\d{0,6})|(\\d|[1-9]\\d|1[0-7]\\d|0{1,3})|180\\.0{0,6}|180)$')]],
      y: [null, [Validators.required, Validators.pattern('^(\\-|\\+)?([0-8]?\\d{1}\\.\\d{0,6}|90\\.0{0,6}|[0-8]?\\d{1}|90)$')]],
      isOneself: [null, Validators.required],
      customerNumber: [null, [Validators.required, Validators.maxLength(32)]],
      cnCustomerLongName: [null, [Validators.required, Validators.maxLength(100)]],
      customerAuthPhone: [null, [Validators.maxLength(11)]],
      touchPhoneOne: [null, [Validators.pattern('[0-9-()（）]{7,18}')]],
      touchPhoneTwo: [null, [Validators.pattern('[0-9-()（）]{7,18}')]],
      callCustomerLine: [null, Validators.required],
      customerManage: [null, Validators.required],
      callClrPeriod: [null, Validators.required],
      callCustomerType: [null, Validators.required],
    });
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

    const params = {
      customerNo: '',
      customerShortName: this.validateForm.controls.customerShortName.value,
      address: this.validateForm.controls.address.value,
      location: this.validateForm.controls.location.value,
      x: this.validateForm.controls.x.value,
      y: this.validateForm.controls.y.value,
      isOneself: this.validateForm.controls.isOneself.value,
      customerNumber: this.validateForm.controls.customerNumber.value,
      cnCustomerLongName: this.validateForm.controls.cnCustomerLongName.value,
      customerAuthPhone: this.validateForm.controls.customerAuthPhone.value,
      customerManage: this.validateForm.controls.customerManage.value,
      touchPhoneOne: this.validateForm.controls.touchPhoneOne.value,
      touchPhoneTwo: this.validateForm.controls.touchPhoneTwo.value,
      callCustomerLine: this.validateForm.controls.callCustomerLine.value,
      callClrPeriod: this.validateForm.controls.callClrPeriod.value,
      callCustomerType: this.validateForm.controls.callCustomerType.value,
    };
    console.log(params);

    this.service.addCallCustomers(params)
      .subscribe(data => {
        console.log(data);
        this.message.success(data['retMsg']);
        this.nzSub.triggerOk();
      }, (error) => {
        console.log(error);
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
          this.nzSub.destroy('NzOnCancel');
        }
      });
  }

  lines = [];

  qryAllLine() {
    this.lines = [];
    // this.validateForm.controls.addnotesLine.setValue(null);
    this.service.qryAllLine({ 'lineType': 2 })
      .subscribe(_data => {
        this.lines = _data.retList;
      });
  }

  // 查询所有客户类型
  qryAllCallCustomerType() {
    this.service.getCallCustomerTypeList().subscribe(_data => {
      this.callCustomerTypeList = _data.retList;
    })
  }


  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
