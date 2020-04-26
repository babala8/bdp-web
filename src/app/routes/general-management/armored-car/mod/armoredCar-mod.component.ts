import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService} from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../models/constant';
import { GeneralManagementService } from "../../general-management.service";

@Component({
  templateUrl: './armoredCar-mod.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class ArmoredCarModComponent implements OnInit {
  validateForm: FormGroup;
  loading = true;
  carStatus=SYS_CONS.CAR_STATUS;
  statusList = [
    {value: 0, label: '故障'},
    {value: 1, label: '正常'}
  ];
  typeList = [
    {value: 0, label: '小型'},
    {value: 1, label: '中型'},
    {value: 2, label: '大型'}
  ];
  signingTypeList = [
    {value: 0, label: '计次'},
    {value: 1, label: '月付'},
    {value: 2, label: '里程付'},
  ];
  armoredCar;
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
      carNo: [this.armoredCar.carNo, []],
      carNumber: [this.armoredCar.carNumber, [Validators.required,Validators.pattern("^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$")]],
      status: [this.armoredCar.status, Validators.required],
      type: [this.armoredCar.type, [Validators.required]],
      signingType: [this.armoredCar.signingType, []],    // 签约方式
      company: [this.armoredCar.company, []],
      maxDuration: [this.armoredCar.maxDuration,[Validators.pattern("^\\d{0,10}$")]],
      maxMileage: [this.armoredCar.maxMileage, [Validators.pattern("^\\d{0,10}$")]],
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
    this.armoredCarService.modArmoredCar(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `修改成功！`,
      );
    }, err => {
      this.loading = false;
    })

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
