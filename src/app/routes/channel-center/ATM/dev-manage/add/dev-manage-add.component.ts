import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { ChannelCenterService } from '../../../channel-center.service';
import { CITIES, REGIONS } from '../../../../../models/constant';
import { SelectAddressComponent } from '@shared';

@Component({
  templateUrl: './dev-manage-add.html',
  styles: [
      `
          form > div {
              padding: 8px 0;
          }
    `,
  ],
})

export class DevManageAddComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  roles;
  devType = [];
  provinces = REGIONS;
  cities = CITIES[this.provinces[0].no];
  org;
  devServiceList = [];
  lines = [];
  point = {
    pointX: '',
    pointY: '',
    address: '',
    province: this.provinces[0].name,
    city: this.cities[0],
  };

  constructor(
    private service: ChannelCenterService,
    private fb: FormBuilder,
    private nzSub: NzModalRef,
    private message: NzMessageService,
    private nzModal: NzModalService,
  ) {
  }

  ngOnInit() {
    this.getDevType();
    this.qryDevServiceCompany();
    this.validateForm = this.fb.group({
      no: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      ip: [null, [Validators.required, Validators.pattern('(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)')]],
      X: [null, [Validators.pattern('^(\\-|\\+)?(((\\d|[1-9]\\d|1[0-7]\\d|0{1,3})\\.\\d{0,6})|(\\d|[1-9]\\d|1[0-7]\\d|0{1,3})|180\\.0{0,6}|180)$')]],
      Y: [null, [Validators.pattern('^(\\-|\\+)?([0-8]?\\d{1}\\.\\d{0,6}|90\\.0{0,6}|[0-8]?\\d{1}|90)$')]],
      orgNo: [null, [Validators.required]],
      awayFlag: [null, [Validators.required]],
      devType: [null, [Validators.required]],
      status: [null, [Validators.required]],
      devService: [null, [Validators.required]],
      address: [null, [Validators.maxLength(40)]],
      netType: [null],
      addnotesLine: [null, [Validators.required]],
      addClrPeriod: [null, [Validators.required]],
      maxAddClrPeriod: [null, [Validators.required, Validators.pattern('[1-9]\\d*')]],
      cycleFlag: [null, [Validators.required]],
      city: [null, [Validators.required]],
      province: [this.provinces[0].name],
      clrCenterNo: [null, [Validators.required]],
      workType: [null, [Validators.required]],
      accountNetpoint: [null, [Validators.required]],
      devLeastSize: [null, [Validators.required]],
      devStantardSize: [null, [Validators.required]],
    });
  }

  qryDevServiceCompany() {
    const params = [];
    this.service.qryDevServiceCompany(params)
      .subscribe(_data => {
        this.devServiceList = _data.retList;
      });
  }

  qryAllLine(clrCenterNo) {
    this.lines = [];
    this.validateForm.controls.addnotesLine.setValue(null);
    if (!clrCenterNo) return;
    this.service.qryAllLine({ clrCenterNo: clrCenterNo })
      .subscribe(_data => {
        this.lines = _data.retList;
      });
  }

  selectOrg(evt: any) {
    const orgNo = evt.no;
    console.log(evt);
    if (orgNo) {
      this.service.getOrg(orgNo)
        .subscribe(_data => {
            this.org = _data;
            for (const province of this.provinces) {
              if (province.name === this.org.region) {
                this.cities = CITIES[province.no];
              }
            }
            // this.validateForm.controls.city.setValue(this.org.city);
            console.log(this.org.city);
            this.point.city = this.org.city;
          },
        );
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getDevType() {
    this.service.getDevTypes({})
      .subscribe(data => {
        this.devType = data['retList'];
      });
  }

  _submitForm() {
    // if(this.validateForm.controls.addClrPeriod.value > this.validateForm.controls.maxAddClrPeriod.value){
    //     this.message.warning('加钞循环周期不能大于最大清机周期！');
    //     return;
    // }
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
    console.log(params);
    params['orgNo'] = params['orgNo']['no'];
    params['accountNetpoint'] = params['accountNetpoint']['no'];
    this.loading = true;

    this.service.addDev(params)
      .subscribe(_data => {
        this.loading = false;
        this.nzSub.triggerOk();
        this.message.success(_data.retMsg);
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });

  }

  openMap() {
    const mapModal = this.nzModal.create({
      nzTitle: '设备地址选择',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '80%',
      nzZIndex: 992,
      nzContent: SelectAddressComponent,
      nzComponentParams: {
        point: this.point,
      },
      nzOnOk: () => {
        this.validateForm.controls.X.setValue(this.point.pointX);
        this.validateForm.controls.Y.setValue(this.point.pointY);
        this.validateForm.controls.address.setValue(this.point.address);
        this.validateForm.controls.city.setValue(this.point.city + '市');
      },
      nzOnCancel: () => {
      },
    });
  }
}
