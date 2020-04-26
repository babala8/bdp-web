import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SYS_CONS } from 'app/models/constant';
import { Org } from "app/models/org";
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ThingsService } from "../../things.service";
import { CONTAINER_TYPE } from 'app/models/constant';

@Component({
  templateUrl: './cashbox-add.component.html',
})
export class CashboxAddComponent implements OnInit {
  validateForm: FormGroup;
  orgType;
  loading = false;
  org = new Org();
  formModel = {};
  devVendors = [];
  attrList = [];
  statusList = SYS_CONS.CONTAINER_STATUS;

  constructor(private fb: FormBuilder,
    private service: ThingsService,
    private nzSub: NzModalRef,
    private message: NzMessageService) {
  }

  ngOnInit() {
    const params = [];
    this.service.getDevVenders(params).subscribe(data => {
      this.devVendors = data['retList'];
    });

    const dynamicControls = {};
    this.attrList.forEach(attr => {
      dynamicControls[attr.propertyNo]= [null, [Validators.required]];
    })
    this.validateForm = this.fb.group({
      customerNo: [null, [Validators.required, Validators.maxLength(20)]],
      entityNo: [null, [Validators.required, Validators.maxLength(30)]],
      ...dynamicControls,
      status: [null, [Validators.required]]
    });
    console.log(this.validateForm)
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
      }
    }

    if (this.validateForm.invalid) {
      return;
    }
    const params = {
      customerNo: this.validateForm.controls.customerNo.value.no,
      customerType: 3,
      containerNo: this.validateForm.controls.entityNo.value,
      productNo: CONTAINER_TYPE.CASHBOX,
      status: this.validateForm.controls.status.value,
      containerPropertyList: this.attrList.map(attr => {
        return {key: attr.propertyNo, name: attr.propertyName, value: this.validateForm.controls[attr.propertyNo].value || '' }
      })
    };
    this.loading = true;
    this.service.addContainer(params)
      .subscribe(_data => {
        this.loading = false;
        this.message.success(`添加款箱成功！`);
        this.nzSub.triggerOk();
      });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}

