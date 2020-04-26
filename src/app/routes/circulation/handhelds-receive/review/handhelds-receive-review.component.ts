import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../models/constant';
import { FormBuilder, Validators } from '@angular/forms';
import { CirculationService } from '../../circulation.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-reseive-raeder',
  templateUrl: './handhelds-receive-review.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class HandheldsReceiveReviewComponent implements OnInit {
  data
  validateForm;
  formModel = {};
  loading = false;
  range = SYS_CONS.KEY_RANGE;
  cFlag = SYS_CONS.CRASH_FLAG;

  constructor(private fb: FormBuilder,
              private service: CirculationService,
              private nzModal: NzModalRef,
              private message: NzMessageService)
{}

  ngOnInit() {


    this.validateForm = this.fb.group({
      tagReaderNo: [{value:this.data.tagReaderNo,disabled: true}, Validators.required],
      requestOpNo: [{value: this.data.requestOpNo,disabled: true}, Validators.required],
      requestDate: [{value: this.data.requestDate,disabled: true}, Validators.required],
      requestTime: [{value: this.data.requestTime,disabled: true}, Validators.required],
      crashFlag: [{value: this.data.crashFlag,disabled: true}, Validators.required],
      reviewResult: [null, Validators.required],
      rejectReason: [null]
    });


  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
  _submitForm() {
    // const params = _.extend({},this.validateForm.value,{tagreaderUseNo:this.data.tagreaderUseNo,tagReaderNo:this.data.tagReaderNo})
    //轻量传输,只传需要的数据
const params={
  tagReaderNo:this.data.tagReaderNo,
  tagReaderUseNo:this.data.tagReaderUseNo,
  reviewResult:this.formModel['reviewResult']||'',
  rejectReason:this.formModel['rejectReason']||''
}
    this.loading = true;
    this.service.auditReaderFlow(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `审核成功！`,
      );

    })

  }

}
