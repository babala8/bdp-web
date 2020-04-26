import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {GeneralManagementService} from "../../general-management.service";

@Component({
  templateUrl: './external-people-mod.html',
})
export class ExternalPeopleModComponent implements OnInit {
  outPeople;  // 外包人员信息
  loading = false;
  postList = [
    { value: 0, label: '外包人员' },
    { value: 1, label: '安保人员' },
    { value: 2, label: '车辆驾驶员' },
  ];    // 外包人员岗位列表
  validateForm: FormGroup;

  constructor(private modal: NzModalRef,
              private message: NzMessageService,
              private outPeopleService: GeneralManagementService,
              private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      no: [this.outPeople.no, [Validators.required,Validators.pattern("^\\w+$")]],
      name: [this.outPeople.name, [Validators.required,Validators.pattern("^[\u4E00-\u9FA5\uf900-\ufa2d]{2,5}$")]],
      post: [this.outPeople.post, [Validators.required]],
      age: [this.outPeople.age, [Validators.required,Validators.pattern("^[0-9]{1,2}$")]],
      mobile: [this.outPeople.mobile,[Validators.pattern("^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$")]],
      familyAddr: [this.outPeople.familyAddr, [Validators.pattern("([^\x00-\xff]|[A-Za-z0-9-_])+")]],
      residenceAddr: [this.outPeople.residenceAddr, [Validators.pattern("([^\x00-\xff]|[A-Za-z0-9-_])+")]],

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
    this.loading = true;
    Object.assign(params, this.validateForm.value);
    this.outPeopleService.modExternalPeople(params)
      .subscribe(data => {
        this.loading = false;
        this.modal.triggerOk();
        this.message.success(
          `修改外包人员信息成功！`,
        );
      }, err => {
        this.loading = false;
      });
  }
}
