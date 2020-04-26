import {Component, OnInit} from '@angular/core';
import {UserManageService} from '../user-manage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {Org} from '../../../../models/org';
import {OrgGrade} from '../../../../models/org-grade';
import {HttpResponse} from '@angular/common/http';
import { RoleManageService } from '../../role-manage/role-manage.service';
import { OrgManageService } from '../../org-manage/org-manage.service';

@Component({
    templateUrl: './user-modify.html'
})
export class UserModifyComponent implements OnInit {
    validateForm: FormGroup;
    user;
    userInfo = {};
    nodes;
    roles;
    org = new Org();
    orgGrade = new OrgGrade();
    options = {};
    loading = false;
    post ;
    types = [{'no': '0', 'name': '系统'},
        {'no': '1', 'name': '金库'},
        {'no': '2', 'name': '网点'}];
    showFlag = false;

    constructor(private fb: FormBuilder,
                private userService: UserManageService,
                private roleService: RoleManageService,
                private orgService: OrgManageService,
                private nzModal: NzModalRef,
                private message: NzMessageService) {
    }

    ngOnInit() {
      console.log(this.user.postDetailList.map(item =>item.postName));
        this.validateForm = this.fb.group({
          username: [{ value: this.user.username, disabled: true } , [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
          name: [this.user.name, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
          org: [{no: this.user.sysOrg.no, name: this.user.sysOrg.name}, Validators.required],
          roleNo: [this.user.roleList.map(item => item.no), Validators.required],
          phone: [this.user.phone, [Validators.required, Validators.pattern("[0-9-()（）]{7,18}")]],
          mobile: [this.user.mobile, [Validators.required, Validators.pattern("0?(13|14|15|17|18|19)[0-9]{9}")]],
          email: [this.user.email, [Validators.email,Validators.required]],
          post: [this.user.postDetailList.map(item =>item.postNo), Validators.required],
        });

        console.log('validateForm',this.validateForm);
        const params = {
            orgGradeNo: this.user.sysOrg.orgGradeNo
        };
        this.roleService.qryRoleByGrade(params).subscribe(data => {
            this.roles = data.retList;
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
                orgGradeNo: data.orgGradeNo
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
        this.validateForm.value.roleNo.forEach( el => {
            roleList.push({no : el})
        });
      const postList = [];
      this.validateForm.value.post.forEach(el => {
        postList.push({ postNo: el });
      });
        var params = {
            roleList: roleList,
            postList: postList,
            orgNo: this.validateForm.controls.org.value.no,
            photo: this.user.photo,
            email: this.validateForm.value.email,
            mobile: this.validateForm.value.mobile,
            name: this.validateForm.value.name,
            phone: this.validateForm.value.phone,
            username: this.user.username,
        };
        console.log( this.validateForm.value, params)
        this.loading = true;
        this.userService.updateUser(params).subscribe(_data => {
            this.loading = false;
            this.nzModal.triggerOk();
            this.message.success(
                `修改用户成功！`
            );
        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });

    }

}
