import {Component, OnInit} from '@angular/core';
import {UserManageService} from '../user-manage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import * as _ from 'lodash';
import {HttpResponse} from '@angular/common/http';
import { RoleManageService } from '../../role-manage/role-manage.service';
import { OrgManageService } from '../../org-manage/org-manage.service';

@Component({
    templateUrl: './user-resubmit.html'
})
export class UserResubmitComponent implements OnInit {
    detailList;
    user;
    userInfo = {};
    validateForm: FormGroup;
    loading;
    roles;
    edit_flag = false;
    oldNo;

    constructor(private fb: FormBuilder,
                private userService: UserManageService,
                private roleService: RoleManageService,
                private orgService: OrgManageService,
                private nzModal: NzModalRef,
                private message: NzMessageService) {
    }

    ngOnInit() {
        this.oldNo = this.user.no;
        if (this.user.auditStatus === 4) {
            this.edit_flag = true;
        }
        this.validateForm = this.fb.group({
            type: [null],
            username: [this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            name: [this.user.name, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
            org: [{no: this.user.orgNo, name: this.user.orgName}, [Validators.required]],
            roleNo: [[], [Validators.required]],
            phone: [this.user.phone, [Validators.required]],
            mobile: [this.user.mobile, [Validators.required]],
            email: [this.user.mobile, [Validators.email]],
            opinion: [this.user.opinion],
            orgNo: [null],
        });
        this.userService.getUser( this.user.username).subscribe(result => {
            Object.assign(this.user, result.retData, {
                roleNo: result.retData.roleList.map(item => item.roleNo),
                type: result.retData.postList.length !== 0 ? result.retData.postList[0].type : '0',
                posts: result.retData.postList.map(item => item.no),
                orgNo: result.retData.org.name,
            });
            this.validateForm.patchValue(this.user);

            // this.roleService.qryRoleByOrgType({
            //     orgType: this.userInfo['org'].orgTypeInfo.no // TODO: 获取当前用户的机构信息
            // }).subscribe(data => {
            //     this.roles = data.retList;
            // });
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    updateConfirmValidator() {
        setTimeout(() => {
            this.getFormControl('name').updateValueAndValidity();
        });
    }

    selectRole($event) {
        this.orgService.getOrg($event.no).subscribe(data => {
            const param = {
                orgType: data.retData.orgTypeInfo.no,
            };
            this.roles = [];
            // this.roleService.qryRoleByOrgType(param).subscribe(_data => {
            //     this.roles = _data.retList;
            //     if ($event.no === this.userInfo['org'].no) {
            //         this.getFormControl('roleNo').setValue(this.userInfo['roleNo']);
            //     } else {
            //         this.validateForm.controls.roleNo.setValue(null);
            //     }
            // });
        });
    }

    resubmit(type: 0 | 1) {
        this.validateForm.patchValue({type: type});
        for (const key in this.validateForm.controls) {
            this.getFormControl(key).markAsDirty();
        }
        if (this.validateForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.resubmitUser({data: _.extend({
            roles: this.getFormControl('roleNo').value,
            auditStatus: this.user.auditStatus,
            oldNo: this.oldNo,
            status: 1,
            groupType: 3,
            duty: 3
        }, this.validateForm.value)})
            .subscribe(_data => {
                this.loading = false;
                this.nzModal.destroy('onOk');
                this.message.success(`成功！`);
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

}
