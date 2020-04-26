import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../models/constant';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { CirculationService } from '../../circulation.service';
import { ThingsService } from "../../../general-management/things/things.service";

import * as _ from 'lodash';

@Component({
  selector: 'app-add-raeder-flow',
  templateUrl: './handhelds-receive-add.component.html'
})

export class HandheldsReceiveAddComponent implements OnInit {
  validateForm;
  loading = false;
  range = SYS_CONS.KEY_RANGE;
  rType = SYS_CONS.READER_TYPE;
  rStatus = SYS_CONS.READER_STATUS;
  cFlag = SYS_CONS.CRASH_FLAG;
  tagReaderList;
  qryUsersInAddNotesGroup = [];
  constructor(private fb: FormBuilder,
              private service: CirculationService,
              private readerService: ThingsService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    // 获取读写器列表
    this.readerService.getTagReader({
      curPage: 1,//当前页码
      pageSize: 9999,//每页条数
      }).subscribe( data => {
      this.tagReaderList = _.filter( data.retList, ['status', 1]);
    });
    // 查询加钞组人员列表
    this.qryUsersInAddNotesGroupForKey();

    this.validateForm = this.fb.group({
      tagReaderNo: [null, Validators.required],
      crashFlag: [null, Validators.required],
      readerType: [{value: null,disabled: true}, Validators.required],
      readerStatus: [{value: null,disabled: true}, Validators.required],
      requestOpNo: [{value: null}, Validators.required],
    });
  }

  // 查询加钞组人员列表
  qryUsersInAddNotesGroupForKey() {
    const params = {};
    this.service.qryUsersInAddNotesGroup(params)
      .subscribe(_data => {
        this.qryUsersInAddNotesGroup = _data['retList'];
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
    this.service.addReaderFlow(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );

    })

  }
  changeReader(e){
    const arr = _.filter(this.tagReaderList, ['tagReaderNo', e]);
    console.log(arr)
    this.validateForm.patchValue({
      readerType: arr[0]['readerType'],
      readerStatus:  arr[0]['status']
    })
  }
}
