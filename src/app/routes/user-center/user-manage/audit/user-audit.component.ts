import {Component, OnInit} from '@angular/core';
import {UserManageService} from '../user-manage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import * as _ from 'lodash';
import {HttpResponse} from '@angular/common/http';
import { RoleManageService } from '../../role-manage/role-manage.service';
import { OrgManageService } from '../../org-manage/org-manage.service';

@Component({
    templateUrl: './user-audit.html'
})
export class UserAuditComponent implements OnInit {
    userInfo;
    detailList = [
        {name: '用户账号', value: this.userInfo.no},
        {name: '用户姓名', value: this.userInfo.name},
        {name: '所属机构', value: this.userInfo.orgName},
        {name: '角色名称', value: this.userInfo.roleName},
    ];
    validateForm: FormGroup;
    loading;


    constructor(private fb: FormBuilder,
                private userService: UserManageService,
                private roleService: RoleManageService,
                private orgService: OrgManageService,
                private nzModal: NzModalRef,
                private message: NzMessageService) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            no: [this.userInfo.no],
            opinion: ['', [Validators.required, Validators.maxLength(300)]],
        });
    }

    audit(type: 0 | 1) {
        if (type === 0 && !this.validateForm.controls.opinion.value) {
            this.validateForm.controls.opinion.setValue('同意');
        }
        this.validateForm.patchValue({type: type});
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        if (this.validateForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.auditUser({
            data: _.extend({
                auditStatus: this.userInfo.auditStatus,
            }, this.validateForm.value)
        }).subscribe(_data => {
            this.loading = false;
            this.nzModal.destroy('onOk');
            this.message.success(
                `成功！`
            );
        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

}
