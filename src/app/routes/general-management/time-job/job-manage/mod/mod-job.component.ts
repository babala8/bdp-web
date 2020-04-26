import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import * as _ from 'lodash';
import {TimeJobService} from "../../time-job.service";

@Component({
  selector: 'app-mod-time-job',
  templateUrl: './mod-job.component.html'
})
export class ModJobComponent implements OnInit {
  data;
  validateForm;
  loading = false;

  constructor(private fb: FormBuilder,
              private service: TimeJobService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      arguments: [this.data.arguments, Validators.required],
      cron: [this.data.cron, Validators.required],
      desp: [this.data.desp, Validators.required],
      id: [this.data.id, Validators.required],
      jobName: [this.data.jobName, Validators.required],
      trigName: [this.data.trigName, Validators.required],
      concurrent: [this.data.concurrent, Validators.required],
      objName: [this.data.objName, Validators.required],
      jobState:[this.data.jobState, Validators.required],
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
    const params = _.extend({},this.validateForm.value,{
    });
    this.loading = true;
    this.service.modJob(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `修改成功！`,
      );

    })

  }
}
