import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {GeneralManagementService} from "../../general-management.service";


@Component({
  templateUrl: './external-people-add.html'
})
export class ExternalPeopleAddComponent implements OnInit{
  postList = [
    {value: '0', label: '外包人员'},
    {value: '1', label: '安保人员'},
    {value: '2', label: '车辆驾驶员'},
  ];
  loading = false;
  validateForm: FormGroup;
  constructor(private modal: NzModalRef,
              private message: NzMessageService,
              private outPeopleService: GeneralManagementService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      no: [null, [Validators.required,Validators.pattern("^[a-zA-Z0-9_]{4,12}$")]],
      name: [null, [Validators.required,Validators.pattern("^[\u4E00-\u9FA5\uf900-\ufa2d]{2,5}$")]],
      post: [null, [Validators.required]],
      age: [null, [Validators.required,Validators.pattern("^[0-9]{1,2}$")]],
      mobile: [null, [Validators.pattern("^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$")]],
      familyAddr: [null, [Validators.pattern("([^\x00-\xff]|[A-Za-z0-9-_])+")]],
      residenceAddr: [null, [Validators.pattern("([^\x00-\xff]|[A-Za-z0-9-_])+")]]

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
    this.outPeopleService.addExternalPeople(params)
      .subscribe(data => {
        this.loading = false;
        this.modal.triggerOk();
        this.message.success(
          `添加成功！`,
        );
      }, err => {
        this.loading = false;
      });
  }
}
