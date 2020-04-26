import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import {SYS_CONS} from "../../../../../models/constant";
import {PostScheduleService} from "../../post-schedule.service";

@Component({
  templateUrl: './post-modify.html',
})
export class PostModifyComponent implements OnInit {
  data;
  validateForm: FormGroup;
  loading = false;
  postTypeList = SYS_CONS.POST_TYPE;
  postDetail;
  postList = [];
  postObj = {};

  constructor(private fb: FormBuilder,
              private postService: PostScheduleService,
              private session: SessionService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    console.log(this.data);
    this.getAllPost();
    this.validateForm = this.fb.group({
      postName: [this.data.postName, [Validators.required, Validators.maxLength(20)]],
      postType: [this.data.postType, [Validators.required]],
      note: [this.data.note],
      postLimitType: [null, [Validators.required]],
    });
    this.getPostDetail(this.data.postNo);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getPostDetail(postNo) {
    this.postService.getPostDetail(postNo).subscribe(data => {
      this.postDetail = data['retList'][0];
      const limitNos = this.postDetail.postLimitList.map(item => {
        return item.postLimitNo;
      });
      //获取详情之后再将具体的数值给postLimitType
      this.validateForm.controls.postLimitType.setValue(limitNos);
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


  _submitForm() {

    const postLimitList = [];
    this.validateForm.value.postLimitType.forEach(postNo => {
      postLimitList.push({ postLimitNo: postNo, postLimitName: this.postObj[postNo], note: '' });
    });

    var params = {
      postNo: this.data.postNo,
      postName: this.validateForm.value.postName,
      postType: this.validateForm.value.postType,
      note: this.validateForm.value.note,
      postLimitList: postLimitList,
    };


    this.loading = true;
    this.postService.modPost(params)
      .subscribe(data => {
        this.loading = false;
        this.nzModal.triggerOk();
        this.message.success(
          `修改岗位成功！`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }
}
