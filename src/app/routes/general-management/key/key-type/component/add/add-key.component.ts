import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {KeyService} from "../../../key.service";
import {SYS_CONS} from "../../../../../../models/constant";

@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html'
})
export class AddKeyComponent implements OnInit {
  validateForm;
  loading = false;
  range = SYS_CONS.KEY_RANGE;

  constructor(private fb: FormBuilder,
              private keyTypeService: KeyService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      clrCenterNo: [null, Validators.required],
      keyUseRange: [null, Validators.required],
      keyTypeName: [null, Validators.required],
      // keyTypeNo: [null, Validators.required],
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
    this.keyTypeService.addKeyType(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );

    })

  }
}
