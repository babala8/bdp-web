import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrgManageService } from '../org-manage.service';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { Org } from '../../../../models/org';
import { CITIES, REGIONS } from '../../../../models/constant';
import { SelectAddressComponent } from '@shared';

@Component({
  templateUrl: './org-add.html',
  styles: [
    `
          span {
          color: red;
      }
    `
  ]
})
export class OrgAddComponent implements OnInit {
  validateForm: FormGroup;
  orgType;
  loading = false;
  provinces = REGIONS;
  cities = CITIES[this.provinces[0].no];
  org = new Org();
  showFlag = 0;
  point = {
    pointX: '',
    pointY: '',
    address: '',
    province: this.provinces[0].name,
    city: this.cities[0],
  };
  allOrgTypes = [];

  constructor(private fb: FormBuilder,
              private orgService: OrgManageService,
              private nzSub: NzModalRef,
              private message: NzMessageService,
              private nzModal: NzModalService) {
  }

  selectOrg(evt: any) {
    const orgNo = evt.no;
    if (orgNo) {
      this.orgService.getOrg(orgNo)
        .subscribe(_data => {
            this.org = _data;
            if (this.org.orgGrade.no === 6) {
              this.message.error('所选机构不允许作为上级机构!', { nzDuration: 10000 });
              this.validateForm.controls.grade.setValue(null);
            } else {
              // this.orgType = this.allOrgTypes[this.org.orgGrade.no];
              this.validateForm.controls.grade.setValue(this.org.orgGrade.no + 1);
            }
            for (const province of this.provinces) {
              if (province.name === this.org.region) {
                this.cities = CITIES[province.no];
              }
            }
          },
        );
    }
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
    // 如果该机构不是金库,则车辆数肯定为0；
    if (this.validateForm.controls.clrCenterFlag.value === 0) {
      this.validateForm.controls.cashTruckNum.setValue(0);
    }
    const deliveryTime: Date = this.validateForm.controls.deliveryTime.value,
          backTime: Date = this.validateForm.controls.backTime.value;
    const params = {
      address: this.validateForm.controls.address.value,
      city: this.validateForm.controls.city.value,
      clrCenterFlag: this.validateForm.controls.clrCenterFlag.value,
      clrCenterNo: this.validateForm.controls.clrCenterNo.value || '',
      name: this.validateForm.controls.name.value,
      no: this.validateForm.controls.no.value,
      orgGradeNo: this.validateForm.controls.grade.value,// 机构等级
      parentOrgNo: this.validateForm.controls.upper.value.no,
      region: this.validateForm.controls.region.value,
      cashTruckNum: this.validateForm.controls.cashTruckNum.value || 0,
      x: this.validateForm.controls.longitude.value,
      y: this.validateForm.controls.latitude.value,
      deliveryTime: deliveryTime.getHours() + ':' + deliveryTime.getMinutes(),
      backTime: backTime.getHours() + ':' + backTime.getMinutes(),
      status: 1,
      areaNo: '',
      addressCode: '',
      areaType: '',
      businessRange: '',
      clrCenterNoCash: '',
      cupAreaCode: '',
      email: '',
      fax: '',
      fullName: '',
      linkman: '',
      mobile: '',
      moneyorgFlag: '', // 无该字段
      note: '', // 无该字段
      orgPhysicsCatalog: '', // 无该字段
      shortName: '', // 无该字段
      telephone: '',
      // orgTypeInfo: { no: this.validateForm.controls.grade.value },
      // clrCenterName: '',
    };
    this.loading = true;
    this.orgService.addOrg(params)
      .subscribe(_data => {
        this.loading = false;
        this.message.success(`添加机构成功！`);
        this.nzSub.triggerOk();
      });

  }

  ngOnInit() {
    this.orgService.qryAllOrgTypes().subscribe(_data => {
      this.allOrgTypes = _data.retList;
    });
    this.validateForm = this.fb.group({
      no: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      name: [null, [Validators.required, Validators.maxLength(20)]],
      upper: [null, [Validators.required]],
      grade: [{value:null,disabled:true}, [Validators.required]],
      region: [this.provinces[0].name,[Validators.required]],
      city: [null, [Validators.required]],
      clrCenterNo: [null],
      address: [null, [Validators.required, Validators.maxLength(40)]],
      longitude: [null, [Validators.required, Validators.pattern("^[\\-\\+]?(0(\\.\\d{1,10})?|([1-9](\\d)?)(\\.\\d{1,10})?|1[0-7]\\d{1}(\\.\\d{1,10})?|180\\.0{1,10})$")]],
      latitude: [null, [Validators.required, Validators.pattern("^[\\-\\+]?((0|([1-8]\\d?))(\\.\\d{1,10})?|90(\\.0{1,10})?)$")]],
      deliveryTime: [null, [Validators.required]],
      backTime: [null, [Validators.required]],
      clrCenterFlag: [0, [Validators.required]],
      clrCenterName: [null],
      cashTruckNum: [null],
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  updateConfirmValidator() {
    /** wait for refresh value */   // TODO:  这个是干什么的？？为什么要异步？
    setTimeout(() => {
      this.validateForm.controls['name'].updateValueAndValidity();
    });
  }

  confirmationValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
  }

  clrCenterFlagChange(clrCenterFlag) {
    this.showFlag = clrCenterFlag;
  }

  openMap() {
    const mapModal = this.nzModal.create({
      nzTitle: '机构地址选择',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '80%',
      nzZIndex: 992,
      nzContent: SelectAddressComponent,
      nzComponentParams: {
        point: this.point,
      },
      nzOnOk: () => {
        this.validateForm.controls.longitude.setValue(this.point.pointX);
        this.validateForm.controls.latitude.setValue(this.point.pointY);
        this.validateForm.controls.address.setValue(this.point.address);
        this.validateForm.controls.city.setValue(this.point.city+'市');
      },
      nzOnCancel: () => {
      },
    });
  }

  disabledDeliveryHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ,21, 22, 23];
  }

  disabledBackHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 20, 21, 22, 23];
  }
}

