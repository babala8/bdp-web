import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SYS_CONS } from "../../../../../models/constant";
import { PostScheduleService } from "../../post-schedule.service";

@Component({
  templateUrl: './post-detail.html',
})
export class PostDetailComponent implements OnInit {
  data;
  validateForm: FormGroup;
  loading = false;
  postTypeList = SYS_CONS.POST_TYPE;
  postDetail;
  postList = [];
  postObj = {};

  constructor(private fb: FormBuilder,
              private postService: PostScheduleService
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.getAllPost();
    this.validateForm = this.fb.group({
      postName: [{ disabled: true, value: this.data.postName }, [Validators.required, Validators.maxLength(20)]],
      postType: [{ disabled: true, value: this.data.postType }, [Validators.required]],
      note: [{ disabled: true, value: this.data.note }],
      postLimitType: [{ disabled: true, value: null }, [Validators.required]],
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

  _submitForm() {}
}
