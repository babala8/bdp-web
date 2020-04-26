import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Org } from "app/models/org";
import { ThingsService } from "../../things.service";
import { CONTAINER_TYPE, SYS_CONS } from 'app/models/constant';


@Component({
  templateUrl: './cassette-mod.component.html',
})
export class CassetteModComponent implements OnInit {
  validateForm: FormGroup;
  orgType;
  name;
  loading = false;
  org = new Org();
  showFlag;
  cassette;
  attrList = [];
  statusList = SYS_CONS.CONTAINER_STATUS;

  constructor(private fb: FormBuilder,
    private service: ThingsService,
    private nzSub: NzModalRef,
    private message: NzMessageService) {
  }

  ngOnInit() {
    this.getOrg(this.cassette.customerNo);
    const dynamicControls = {};
    this.attrList.forEach(attr => {
      dynamicControls[attr.propertyNo]= [
        this.cassette.containerPropertyList.find(e => e.key === attr.propertyNo).value,
        [Validators.required]];
    })
    this.validateForm = this.fb.group({
      customerNo: [this.cassette.customerNo, [Validators.required]],
      entityNo: [{ value: this.cassette.containerNo, disabled: true }, [Validators.required]],
      ...dynamicControls,
      status: [this.cassette.status + '', [Validators.required]]
    });
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
    const params = {
      productNo: CONTAINER_TYPE.CASHBOX,
      customerNo: this.validateForm.controls.customerNo.value.no,
      customerType: 3,
      containerNo: this.validateForm.controls.entityNo.value || '',
      containerPropertyList: this.attrList.map(attr => {
        return {key: attr.propertyNo, name: attr.propertyName, value: this.validateForm.controls[attr.propertyNo].value || '' }
      })
    };
    this.loading = true;
    this.service.modContainer(params)
      .subscribe(_data => {
        this.loading = false;
        this.message.success(`修改款箱成功！`);
        this.nzSub.triggerOk();
      });

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getOrg(no) {
    this.service.getOrg(this.cassette.customerNo).subscribe(item => {
      this.validateForm.controls['customerNo'].setValue({ no: item.no, name: item.name });
    })
  }
}

