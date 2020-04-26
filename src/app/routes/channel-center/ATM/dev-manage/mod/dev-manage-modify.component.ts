import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { ChannelCenterService } from '../../../channel-center.service';
import { CITIES, REGIONS } from '../../../../../models/constant';
import { SelectAddressComponent } from '@shared';

@Component({
  templateUrl: './dev-manage-modify.html',
  styles: [`
    form > div {
      padding: 8px 0;
    }
  `],
})

export class DevManageModifyComponent implements OnInit {
  validateForm: FormGroup;
  formModel = {};
  devInfo;
  loading = false;
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
    this.validateForm = this.fb.group({
      no: [{
        value: this.devInfo.no,
        disabled: true,
      }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      ip: [this.devInfo.ip, [Validators.required, Validators.pattern('(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)')]],
      /*X: [this.devInfo.x, [Validators.pattern('^(\\-|\\+)?(((\\d|[1-9]\\d|1[0-7]\\d|0{1,3})\\.\\d{0,6})|(\\d|[1-9]\\d|1[0-7]\\d|0{1,3})|180\\.0{0,6}|180)$')]],
      Y: [this.devInfo.y, [Validators.pattern('^(\\-|\\+)?([0-8]?\\d{1}\\.\\d{0,6}|90\\.0{0,6}|[0-8]?\\d{1}|90)$')]],*/
      X: [this.devInfo.x, [Validators.pattern('^[\\-\\+]?(0(\\.\\d{1,10})?|([1-9](\\d)?)(\\.\\d{1,10})?|1[0-7]\\d{1}(\\.\\d{1,10})?|180\\.0{1,10})$')]],
      Y: [this.devInfo.y, [Validators.pattern('^[\\-\\+]?((0|([1-8]\\d?))(\\.\\d{1,10})?|90(\\.0{1,10})?)$')]],
      orgNo: [{ no: this.devInfo.sysOrg.no, name: this.devInfo.sysOrg.name }, [Validators.required]],
      awayFlag: [this.devInfo.awayFlag, [Validators.required]],
      devType: [this.devInfo.devType, [Validators.required]],
      status: [this.devInfo.status, [Validators.required]],
      devService: [this.devInfo.devService, [Validators.required]],
      address: [this.devInfo.address, [Validators.maxLength(40)]],
      netType: [this.devInfo.netType],
      addnotesLine: [this.devInfo.addnotesLine, [Validators.required]],
      addClrPeriod: [{ value: this.devInfo.addClrPeriod, disabled: true }, [Validators.required]],
      maxAddClrPeriod: [{ value: this.devInfo.maxAddClrPeriod, disabled: true }, [Validators.required, Validators.pattern('[1-9]\\d*')]],
      cycleFlag: [this.devInfo.cycleFlag, [Validators.required]],
      city: [this.devInfo.city],
      province: [this.devInfo.province || this.provinces[0].name],
      clrCenterNo: [this.devInfo.clrCenterNo, [Validators.required]],
      workType: [this.devInfo.workType, [Validators.required]],
      accountNetpoint: [this.devInfo.accountNetpoint ? {
        no: this.devInfo.accountNetpoint,
        name: this.devInfo.accountNetpointName,
      } : null, [Validators.required]],
      devLeastSize: [this.devInfo.devLeastSize || 0, [Validators.required]],
      devStantardSize: [this.devInfo.devStantardSize || 0, [Validators.required]],
    });
    this.getDevType();
    this.qryDevServiceCompany();
    this.qryAllLine(this.devInfo.clrCenterNo, true);
  }

  selectOrg(evt: any) {
    const orgNo = evt.no;
    if (orgNo) {
      this.service.getOrg(orgNo)
        .subscribe(_data => {
          console.log(_data)
            this.org = _data;
           // this.point.city = this.point.city || this.org.city;
            console.log(this.point.city)
          },
        );
    }
  }

  getDevType() {
    this.service.getDevTypes({})
      .subscribe(data => {
        this.devType = data['retList'];
      });
  }

  qryDevServiceCompany() {
    this.service.qryDevServiceCompany(null)
      .subscribe(_data => {
        this.devServiceList = _data.retList;
      });
  }

  qryAllLine(clrCenterNo, init = false) {
    this.lines = [];
    if (!init) this.validateForm.controls.addnotesLine.setValue(null);
    if (!clrCenterNo) return;

    this.service.qryAllLine({ clrCenterNo: clrCenterNo })
      .subscribe(_data => {
        this.lines = _data.retList;
      });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
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

    const params = this.validateForm.value;
    params['orgNo'] = params['orgNo']['no'];
    params['accountNetpoint'] = params['accountNetpoint']['no'];
    params['no'] = this.validateForm.controls.no.value;
    this.loading = true;
    console.log(params);
    this.service.modDev(params)
      .subscribe(_data => {
        this.loading = false;
        this.nzSub.triggerOk();
        this.message.success(
          `修改设备信息成功！`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  openMap() {
    this.point.pointX = this.validateForm.controls.X.value;
    this.point.pointY = this.validateForm.controls.Y.value;
    this.point.address = this.validateForm.controls.address.value;

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
        this.validateForm.controls.city.setValue(this.point.city+'市');
      },
      nzOnCancel: () => {
      },
    });
  }
}
