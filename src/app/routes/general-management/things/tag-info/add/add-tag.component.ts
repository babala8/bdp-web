import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ThingsService } from "../../things.service";
import {SYS_CONS} from "../../../../../models/constant";

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html'
})
export class AddTagComponent implements OnInit {
  validateForm;
  loading = false;
  tType = SYS_CONS.TAG_TYPE;
  tStatus = SYS_CONS.TAG_STATUS;

  constructor(private fb: FormBuilder,
              private service: ThingsService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      clrCenterNo: [null, Validators.required],
      tagTid: [null, Validators.required],
      tagType: [null, Validators.required],
      status: [null, Validators.required],
      note: [null ],
      epcInfo: [null ],
      epcMemorySize: [null ],
      userdataMemorySize: [null ],
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
    this.service.addTag(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );

    })
  }
}
