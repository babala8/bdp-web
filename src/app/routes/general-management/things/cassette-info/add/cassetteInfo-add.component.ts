import { CONTAINER_TYPE } from './../../../../../models/constant';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SYS_CONS } from 'app/models/constant';
import { Page } from 'app/models/page';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ThingsService } from "../../things.service";

@Component({
  templateUrl: './cassetteInfo-add.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class CassetteInfoAddComponent implements OnInit {
  attrList = [];
  validateForm: FormGroup;
  loading = true;
  formModel = {};
  page = new Page();
  statusList = SYS_CONS.CONTAINER_STATUS;

  constructor(private fb: FormBuilder,
    private nzModal: NzModalRef,
    private message: NzMessageService,
    private cassetteInfoService: ThingsService
  ) {
  }

  ngOnInit(): void {
    const dynamicControls = {};
    this.attrList.forEach(attr => {
      dynamicControls[attr.propertyNo]= [null, [Validators.required]];
    })
    this.validateForm = this.fb.group({
      casstte_no: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(32)]],
      ...dynamicControls,
      status: [null, Validators.required]
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
    this.loading = true;


    const params = {
      containerNo: this.formModel['casstte_no'] || '',
      productNo: CONTAINER_TYPE.CASSETTE,
      containerPropertyList: this.attrList.map(attr => {
        return {key: attr.propertyNo, name: attr.propertyName, value: this.validateForm.controls[attr.propertyNo].value || '' }
      }),
      status: this.formModel['status'] || '',
    };
    this.cassetteInfoService.addContainer(params).subscribe(() => {
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

}
