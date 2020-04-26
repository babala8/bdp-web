import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitApplyService } from '../visit-apply.service';

@Component({
  templateUrl: './visit-apply-add.html',
})
export class VisitApplyAddComponent implements OnInit {
  timeList = [
    { value: '08', label: '08 : 00 : 00' },
    { value: '09', label: '09 : 00 : 00' },
    { value: '10', label: '10 : 00 : 00' },
    { value: '11', label: '11 : 00 : 00' },
    { value: '13', label: '13 : 00 : 00' },
    { value: '14', label: '14 : 00 : 00' },
    { value: '15', label: '15 : 00 : 00' },
    { value: '16', label: '16 : 00 : 00' },
    { value: '17', label: '17 : 00 : 00' },
  ];
  visitOrderList = [];
  loading = false;
  validateForm: FormGroup;

  constructor(private modal: NzModalRef,
              private message: NzMessageService,
              private visitOrderService: VisitApplyService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      customerNumber: [null, []],
      customerShortName: [null, [Validators.required]],
      orderDate: [null, [Validators.required]],
      orderTime: [null, [Validators.required]],
      orderTimePeriod: [null, []],
      note: [null, []],
    });
    this.qryCustomerOrder();
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
    this.loading = true;
    Object.assign(params, this.validateForm.value, {
      orderDate: this.validateForm.value.orderDate.format('YYYY-MM-DD'),
      orderTimePeriod: this.validateForm.value.orderTime < 12 ? 1 : 2,
      orderTime: this.validateForm.value.orderTime + ':00:00',
    });
    this.visitOrderService.addVisitOrder(params)
      .subscribe(data => {
        this.loading = false;
        this.modal.triggerOk();
        this.message.success(
          `添加预约成功！`,
        );
      }, err => {
        this.loading = false;
      });
  }

  timeChange(time) {
    if (this.validateForm.value.orderTime < 12)
      this.getFormControl('orderTimePeriod').setValue('上午');
    else
      this.getFormControl('orderTimePeriod').setValue('下午');
  }

  qryCustomerOrder() {
    this.visitOrderService.qryVisitOrderList()
      .subscribe(result => {
        this.visitOrderList = result['retList'];
      });
  }

  matchCustomerName2ID(customerNumber) {
    this.getFormControl('customerNumber').setValue(customerNumber);
  }


}
