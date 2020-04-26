import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {CAR, SYS_CONS} from '../../../../models/constant';
import {GeneralManagementService} from "../../general-management.service";

@Component({
  templateUrl: './armoredCar-add.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class ArmoredCarAddComponent implements OnInit {
  validateForm: FormGroup;
  loading = true;
  carStatus=SYS_CONS.CAR_STATUS;
  // 车辆状态
  statusList = CAR.CAR_STATUS;
  // 车辆类型
  typeList = CAR.CAR_TYPE;
  // 押运车签约方式
  signingTypeList = CAR.SINGING_TYPE;
  companyList = [];
  constructor(private fb: FormBuilder,
              private nzModal: NzModalRef,
              private message: NzMessageService,
              private armoredCarService: GeneralManagementService
  ) {
  }

  ngOnInit(): void {
    this.qryCompanyList();
    this.validateForm = this.fb.group({
      carNumber: [null, [Validators.required,Validators.pattern("^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$")]],
      status: [null, Validators.required],
      type: [null, [Validators.required]],
      signingType: [null, []],    // 签约方式
      company: [null, []],
      maxDuration: [null, [Validators.pattern("^\\d{0,10}$")]],
      maxMileage: [null, [Validators.pattern("^\\d{0,10}$")]],
    });
  }

  // 查询服务商列表
  qryCompanyList() {
    // 查询服务商
    this.armoredCarService.qryProviderList({type: 2})
      .subscribe(result => {
        this.companyList = result['retList'];
      })
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
    const params = this.validateForm.value;
    this.loading = true;
    this.armoredCarService.addArmoredCar(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );
    }, err => {
      this.loading = false;
    })

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
