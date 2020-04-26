import { Component, OnInit } from '@angular/core';
import { AbnormalTaskService } from '../abnormal-task.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lintSyntaxError } from 'tslint/lib/verify/lintError';
import { load } from '@angular/core/src/render3';

@Component({
  templateUrl: './operate.html',
})

export class OperateCompoment implements OnInit {
  task;
  validateForm: FormGroup;
  loading = false;
  operateTypeList = [];
  userList = [];


  constructor(private abnormalTaskService: AbnormalTaskService,
              private modalRef: NzModalRef,
              private fb: FormBuilder,
              private message: NzMessageService ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      taskNo: [this.task.taskNo, [Validators.required]],
      operateType: [null, [Validators.required]],
      name: [null, [Validators.required]],
      operateDate: [null, [Validators.required]],
      operateTime: [null, [Validators.required]],
    });
    this.getOperateTypeList();
    this.getUserList();
  }

  // 查询可以进行的操作类型
  getOperateTypeList() {
    this.abnormalTaskService.qryOperateList({serviceNo: this.task.taskType})
      .subscribe(data => {
        this.operateTypeList = data['retList'];
      })
  }

  // 查询所有用户
  getUserList() {
    this.abnormalTaskService.qryOpoerator({})
      .subscribe(data => {
        this.userList = data['retList'];
      })

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
  // 提交
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
    this.loading = true;
    const params = {
      taskNo: this.task.taskNo,
      name: this.getFormControl('name').value,
      operateType: this.getFormControl('operateType').value,
      date: this.getFormControl('operateDate').value.format('YYYY-MM-DD') + ' ' + this.getFormControl('operateTime').value.format('HH:mm:ss'),
      operateTypeFlag: '2',
    };
    console.log(params);
    this.abnormalTaskService.operateTask(params)
      .subscribe(_data => {
        this.loading = false;
        this.message.success('操作成功');
        this.modalRef.triggerOk();
      }, err => {
        this.loading = false;
      })
  }
}
