import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {SYS_CONS} from "../../../../../models/constant";
import {KeyService} from "../../key.service";

@Component({
  selector: 'app-add-key-group',
  templateUrl: './add-key-group.component.html'
})
export class AddKeyGroupComponent implements OnInit {
  validateForm;
  loading = false;
  kStatus = SYS_CONS.KEY_GROUP_STATUS;

  constructor(private fb: FormBuilder,
              private service: KeyService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      clrCenterNo: [null, Validators.required],
      // keyGroupNo: [null, Validators.required],
      keyGroupDesp: [null],
      status: [null, Validators.required],
      note: [null ]
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
    this.loading = true;
    this.service.addKeyGroup(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );

    })

  }
}
