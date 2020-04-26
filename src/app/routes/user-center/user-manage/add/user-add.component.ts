import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManageService } from '../user-manage.service';
import { Org } from '../../../../models/org';
import { OrgGrade } from '../../../../models/org-grade';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import { HttpResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { OrgManageService } from '../../org-manage/org-manage.service';
import { RoleManageService } from '../../role-manage/role-manage.service';


@Component({
  templateUrl: './user-add.html',
})
export class UserAddComponent implements OnInit {
  validateForm: FormGroup;
  nodes;
  roles;
  org = new Org();
  orgGrade = new OrgGrade();
  options = {};
  loading = false;
  curOrg = this.session.orgNo;
  post = [];

  types = [{ 'no': '0', 'name': '系统' },
    { 'no': '1', 'name': '金库' },
    { 'no': '2', 'name': '网点' }];

  constructor(private fb: FormBuilder,
              private userService: UserManageService,
              private orgService: OrgManageService,
              private roleService: RoleManageService,
              private session: SessionService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  showFlag = false;

  ngOnInit() {

    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      org: [null, [Validators.required]],
      roleNo: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern("[0-9-()（）]{7,18}")]],
      mobile: [null, [Validators.required, Validators.pattern("0?(13|14|15|17|18|19)[0-9]{9}")]],
      email: [null, [Validators.required, Validators.email]],
      post: [null, [Validators.required]],
    });
    this.getPost();
  }


  getPost() {
    this.userService.getPost().subscribe(data => {
      this.post = data.retList;
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  updateConfirmValidator() {
    setTimeout(() => {
      this.validateForm.controls['name'].updateValueAndValidity();
    });
  }

  selectRole($event) {
    this.orgService.getOrg($event.no).subscribe(data => {
      this.getFormControl('roleNo').setValue(null);
      const param = {
        orgGradeNo: data.orgGradeNo,
      };
      this.roleService.qryRoleByGrade(param).subscribe(_data => {
        this.roles = _data.retList;
      });
    });
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

    const roleList = [];
    this.validateForm.value.roleNo.forEach(el => {
      roleList.push({ no: el });
    });

    const postList = [];
    this.validateForm.value.post.forEach(el => {
      postList.push({ postNo: el });
    });
    var params = {
      roleList: roleList,
      postList: postList,
      orgNo: this.validateForm.value.org.no,
      photo: '',
      email: this.validateForm.value.email,
      mobile: this.validateForm.value.mobile,
      name: this.validateForm.value.name,
      phone: this.validateForm.value.phone,
      username: this.validateForm.value.username,
      password: Md5.hashStr(this.validateForm.value.username + 'messi').toString(),
    };

    this.loading = true;
    this.userService.addUser(params)
      .subscribe(data => {
        this.loading = false;
        this.nzModal.triggerOk();
        this.message.success(
          `增加用户成功！`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }
}

