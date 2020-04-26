import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '@core/session.service';
import { SelectAddressComponent } from '@shared';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { CITIES, REGIONS } from '../../../../models/constant';
import { Org } from '../../../../models/org';
import { OrgManageService } from '../org-manage.service';

@Component({
  templateUrl: './org-modify.html',
})
export class OrgModifyComponent implements OnInit {

  validateForm: FormGroup;
  org: Org;
  provinces = REGIONS;
  cities = CITIES[this.provinces[0].no];
  loading = false;
  showFlag = 0;
  upper;
  orgType;
  point = {
    pointX: '',
    pointY: '',
    address: '',
    region: this.provinces[0].name,
    city: this.cities[0],
  };
  allOrgTypes = [];

  constructor(private fb: FormBuilder,
    private orgService: OrgManageService,
    private nzSub: NzModalRef,
    private session: SessionService,
    private message: NzMessageService,
    private nzModal: NzModalService
  ) { }


  ngOnInit(): void {
    console.log(this.org);
    this.orgType = this.org.orgGrade;
    if (this.org.parentOrg === null) {
      this.upper = '';
    } else {
      this.upper = this.org.parentOrg;
    }
    let deliveryTime = new Date(), backTime = new Date();
    if (!!this.org.deliveryTime) {
      const arr = this.org.deliveryTime.split(':');
      deliveryTime.setHours(parseInt(arr[0], 10));
      deliveryTime.setMinutes(parseInt(arr[1], 10));
    } else {
      deliveryTime = null;
    }
    if (!!this.org.backTime) {
      const arr = this.org.backTime.split(':');
      backTime.setHours(parseInt(arr[0], 10));
      backTime.setMinutes(parseInt(arr[1], 10));
    } else {
      backTime = null;
    }
    this.validateForm = this.fb.group({
      no: [{ value: this.org.no, disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      name: [this.org.name, [Validators.required, Validators.maxLength(20)]],
      upper: [this.upper, [Validators.required]],
      grade: [{value: this.org.orgGrade.no, disabled: true}, [Validators.required]],
      address: [this.org.address, [Validators.required, Validators.maxLength(40)]],
      longitude: [this.org.x, [Validators.required, Validators.pattern("^[\\-\\+]?(0(\\.\\d{1,10})?|([1-9](\\d)?)(\\.\\d{1,10})?|1[0-7]\\d{1}(\\.\\d{1,10})?|180\\.0{1,10})$")]],
      latitude: [this.org.y, [Validators.required, Validators.pattern("^[\\-\\+]?((0|([1-8]\\d?))(\\.\\d{1,10})?|90(\\.0{1,10})?)$")]],
      region: [this.org.region || this.provinces[0].name, [Validators.required]],
      city: [this.org.city, [Validators.required]],
      clrCenterNo: [this.org.clrCenterNo],
      clrCenterFlag: [this.org.clrCenterFlag, [Validators.required]],
      clrCenterName: [this.org.clrCenter && this.org.clrCenter.centerName],
      cashTruckNum: [this.org.clrCenter && this.org.clrCenter.cashTruckNum],
      deliveryTime: [deliveryTime, [Validators.required]],
      backTime: [backTime, [Validators.required]]
    });

    this.orgService.qryAllOrgTypes().subscribe(_data => {
      this.allOrgTypes = _data.retList;
    });
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

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls['name'].updateValueAndValidity();
    });
  }

  updateSameValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls['upper'].updateValueAndValidity();
    });
  }

  sameValidator = (control: FormControl): {} => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.no == this.org.no) {
      return { same: true, error: true, explain: '上级机构不允许为当前机构' };
    }
  };

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
      shortName: '', //无该字段
      telephone: '',
      // orgTypeInfo: { no: this.validateForm.controls.grade.value },
      // clrCenterName: '',
    };

    this.loading = true;
    this.orgService.updateOrg(params)
      .subscribe(data => {
        this.loading = false;
        this.message.success('修改机构成功！');
        this.nzSub.triggerOk();
      });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  clrCenterFlagChange(clrCenterFlag) {
    this.showFlag = clrCenterFlag;
  }

  openMap() {
    this.point.pointX = this.validateForm.controls.longitude.value;
    this.point.pointY = this.validateForm.controls.latitude.value;
    this.point.address = this.validateForm.controls.address.value;
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
        this.validateForm.controls.city.setValue(this.point.city);
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
