import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../../channel-center.service';


@Component({
  templateUrl: './dev-type-detail.html',
})

export class DevTypeDetailComponent implements OnInit {
  validateForm: FormGroup;
  devVendors = [];
  devCatalogs = [];
  devType;

  constructor(private fb: FormBuilder,
              private nzModal: NzModalRef,
              private message: NzMessageService,
              private service: ChannelCenterService,
              ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      no: [{ value: this.devType.no, disabled: true }, Validators.required],
      name: [{ value: this.devType.name, disabled: true }, Validators.required],
      vendorNo: [this.devType.devVendorTable.no, Validators.required],
      catalogNo: [this.devType.devCatalogTable.no, Validators.required],
      cashType: [this.devType.cashType, Validators.required],
    });
    console.log(this.devType);
    const params = {};
    this.service.getDevVenders(params)
      .subscribe(data => {
        console.log(data);
        this.devVendors = data['retList'];
      });
    this.service.getDevCatalogs(params)
      .subscribe(data => {
        console.log(data);
        this.devCatalogs = data['retList'];
      });
  }

  _submitForm() {
    this.nzModal.destroy('nzOnCancel');
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
