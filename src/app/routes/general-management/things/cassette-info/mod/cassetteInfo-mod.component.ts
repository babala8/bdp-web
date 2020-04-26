import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONTAINER_TYPE, SYS_CONS } from 'app/models/constant';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ThingsService } from "../../things.service";

@Component({
  templateUrl: './cassetteInfo-mod.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class CassetteInfoModComponent implements OnInit {
  attrList = [];
  validateForm: FormGroup;
  cassetteInfo;
  loading = true;
  statusList = SYS_CONS.CONTAINER_STATUS;

  constructor(private fb: FormBuilder,
    private nzModal: NzModalRef,
    private message: NzMessageService,
    private cassetteInfoService: ThingsService
  ) {
  }

  ngOnInit() {
    const dynamicControls = {};
    this.attrList.forEach(attr => {
      dynamicControls[attr.propertyNo] = [
        this.cassetteInfo.containerPropertyList.find(e => e.key === attr.propertyNo).value,
        [Validators.required]];
    })
    this.validateForm = this.fb.group({
      casstte_no: [{ value: this.cassetteInfo.containerNo, disabled: true }, [Validators.required]],
      ...dynamicControls,
      status: [this.cassetteInfo.status + '', [Validators.required]]
    });
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

    const params = {
      containerNo: this.validateForm.controls.casstte_no.value || '',
      productNo: CONTAINER_TYPE.CASSETTE,
      containerPropertyList: this.attrList.map(attr => {
        return { key: attr.propertyNo, name: attr.propertyName, value: this.validateForm.controls[attr.propertyNo].value || '' }
      }),
      status: this.validateForm.controls.status.value || '',
    };

    this.loading = true;
    this.cassetteInfoService.modContainer(params).subscribe(data => {
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `修改成功！`,
      );
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

}
