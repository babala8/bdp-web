import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../../channel-center.service';


@Component({
  templateUrl: './customer-info-detail.html',
  styles: [
    `
        form>div {
            padding: 8px 0;
        }
    `
  ]
})

export class CustomerInfoDetailComponent implements OnInit {
  validateForm: FormGroup;
  callCustomer;
  callCustomerTypeList = [];

  constructor(private fb: FormBuilder,
              private nzModal: NzModalRef,
              private message: NzMessageService,
              private service: ChannelCenterService,
              ) {
  }

  ngOnInit(): void {
    this.qryAllLine();
    this.qryAllCallCustomerType();
    this.validateForm = this.fb.group({
      customerNo: [{ value: this.callCustomer.customerNo, disabled: true }, Validators.required],
      customerShortName: [{ value: this.callCustomer.customerShortName, disabled: true }, Validators.required],
      address: [{ value: this.callCustomer.address, disabled: true }, Validators.required],
      location: [{ value: this.callCustomer.location, disabled: true }, Validators.required],
      x: [{ value: this.callCustomer.x, disabled: true }, Validators.required],
      y: [{ value: this.callCustomer.y, disabled: true }, Validators.required],
      isOneself: [{ value: this.callCustomer.isOneself, disabled: true }, Validators.required],
      customerNumber: [{ value: this.callCustomer.customerNumber, disabled: true }, Validators.required],
      cnCustomerLongName: [{ value: this.callCustomer.cnCustomerLongName, disabled: true }, Validators.required],
      customerAuthPhone: [{ value: this.callCustomer.customerAuthPhone, disabled: true }, Validators.required],
      customerManage: [{ value: this.callCustomer.customerManage, disabled: true }, Validators.required],
      touchPhoneOne: [{ value: this.callCustomer.touchPhoneOne, disabled: true }, Validators.required],
      touchPhoneTwo: [{ value: this.callCustomer.touchPhoneTwo, disabled: true }, Validators.required],
      callCustomerLine: [{ value: this.callCustomer.callCustomerLine, disabled: true }, Validators.required],
      callClrPeriod: [{ value: this.callCustomer.callClrPeriod, disabled: true }, Validators.required],
      callCustomerType: [{ value: parseInt(this.callCustomer.callCustomerType) , disabled: true }, Validators.required],
    });
    console.log(this.validateForm);
  }

  lines = [];
  isOneselfs = [{'label':'是','value':'1'},{'label':'否','value':'0'}]
  qryAllLine() {
      this.lines = [];
      // this.validateForm.controls.addnotesLine.setValue(null);
      this.service.qryAllLine({"lineType":2})
          .subscribe(_data => {
              this.lines = _data.retList;
          });
  }

  _submitForm() {
    this.nzModal.destroy('nzOnCancel');
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  // 查询所有客户类型
  qryAllCallCustomerType() {
    this.service.getCallCustomerTypeList().subscribe(_data => {
      this.callCustomerTypeList = _data.retList;
    })
  }
}
