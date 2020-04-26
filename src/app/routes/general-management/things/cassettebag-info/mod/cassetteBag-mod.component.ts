import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONTAINER_TYPE } from 'app/models/constant';
import { SYS_CONS } from 'app/models/constant';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ThingsService } from "../../things.service";

@Component({
  templateUrl: './cassetteBag-mod.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class CassetteBagModComponent implements OnInit {
  attrList = [];
  statusList = SYS_CONS.CONTAINER_STATUS;
  validateForm: FormGroup;
  cassetteBag;
  loading = true;
  constructor(private fb: FormBuilder,
    private nzModal: NzModalRef,
    private message: NzMessageService,
    private cassetteBagService: ThingsService
  ) {
  }

  ngOnInit() {
    const dynamicControls = {};
    this.attrList.forEach(attr => {
      dynamicControls[attr.propertyNo] = [
        this.cassetteBag.containerPropertyList.find(e => e.key === attr.propertyNo).value,
        [Validators.required]];
    })
    this.validateForm = this.fb.group({
      bag_no: [{ value: this.cassetteBag.containerNo, disabled: true }, [Validators.required, Validators.minLength(9), Validators.maxLength(32)]],
      ...dynamicControls,
      status: [this.cassetteBag.status + '', Validators.required]
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
      containerNo: this.validateForm.controls.bag_no.value,
      productNo: CONTAINER_TYPE.CASSETTE_BAG,
      containerPropertyList: this.attrList.map(attr => {
        return { key: attr.propertyNo, name: attr.propertyName, value: this.validateForm.controls[attr.propertyNo].value || '' }
      }),
      status: this.validateForm.controls.status.value,
    };

    this.loading = true;
    this.cassetteBagService.modContainer(params).subscribe(data => {
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
