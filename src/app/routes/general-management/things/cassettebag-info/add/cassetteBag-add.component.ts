import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SYS_CONS } from 'app/models/constant';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ThingsService } from "../../things.service";
import { CONTAINER_TYPE } from './../../../../../models/constant';


@Component({
  templateUrl: './cassetteBag-add.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class CassetteBagAddComponent implements OnInit {
  attrList = [];
  statusList = SYS_CONS.CONTAINER_STATUS;
  validateForm: FormGroup;
  loading = true;

  constructor(private fb: FormBuilder,
    private nzModal: NzModalRef,
    private message: NzMessageService,
    private cassetteBagService: ThingsService
  ) {
  }

  ngOnInit(): void {
    const dynamicControls = {};
    this.attrList.forEach(attr => {
      dynamicControls[attr.propertyNo]= [null, [Validators.required]];
    })
    this.validateForm = this.fb.group({
      bag_no: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(32)]],
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
      containerNo: this.validateForm.controls.bag_no.value || '',
      productNo: CONTAINER_TYPE.CASSETTE_BAG,
      containerPropertyList: this.attrList.map(attr => {
        return {key: attr.propertyNo, name: attr.propertyName, value: this.validateForm.controls[attr.propertyNo].value || '' }
      }),
      status: this.validateForm.controls.status.value || ''
    };
    this.cassetteBagService.addContainer(params).subscribe(data => {
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `提交成功！`,
      );
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
