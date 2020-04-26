import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import { HttpResponse } from '@angular/common/http';
import { SYS_CONS } from "../../../../../models/constant";
import { PostScheduleService } from "../../post-schedule.service";


@Component({
  templateUrl: './post-add.html',
})
export class PostAddComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  postTypeList = SYS_CONS.POST_TYPE;
  postList = [];
  postObj = {};


  constructor(private fb: FormBuilder,
              private postService: PostScheduleService,
              private session: SessionService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      postName: [null, [Validators.required, Validators.maxLength(20)]],
      postType: [null, [Validators.required]],
      note: [null],
      postList: [null, [Validators.required]],
    });
    this.getAllPost();
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }


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

    const postLimitList = [];
    this.validateForm.value.postList.forEach(postNo => {
      postLimitList.push({ postLimitNo: postNo, postLimitName: this.postObj[postNo], note: '' });
    });

    var params = {
      postName: this.validateForm.value.postName,
      postType: this.validateForm.value.postType,
      note: this.validateForm.value.note,
      postLimitList: postLimitList,
    };


    this.loading = true;
    this.postService.addPost(params)
      .subscribe(data => {
        this.loading = false;
        this.nzModal.triggerOk();
        this.message.success(
          `新增岗位成功！`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  getAllPost() {
    return this.postService.getAllPost().subscribe(data => {
      this.postList = data.retList;
      //将No和name进行了绑定关系
      this.postList.forEach(item => {
        this.postObj[item.postNo] = item.postName;
      });
    });
  }
}

