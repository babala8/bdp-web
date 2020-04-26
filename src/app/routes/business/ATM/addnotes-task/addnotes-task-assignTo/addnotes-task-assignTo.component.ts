import {Component, OnInit} from '@angular/core';
import {NzModalService, NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd';
import * as _ from 'lodash';
import {HttpResponse} from '@angular/common/http';
import { AddnotesTaskService } from '../addnotes-task.service';

@Component({
    templateUrl: 'addnotes-task-assignTo.html'
})

export class AddnotesTaskAssignToComponent implements OnInit {

    dispatch: any;
    dispatchDetailGroups = [];
    qryUsersInAddNotesGroup = []
    qryUsersInAddNotesGroupForKeys = [];
    qryUsersInAddNotesGroupForPwds = [];
    validateForm: FormGroup;
    uerts = [];
    loading = false;

    constructor(private modal: NzModalService,
                private fb: FormBuilder,
                private subject: NzModalRef,
                private service: AddnotesTaskService,
                private message: NzMessageService) {
    }

    ngOnInit() {
        console.log(this.dispatch);

        this.qryUsersInAddNotesGroupForKey();

        this.validateForm = this.fb.group({
            planFinishDate: [this.dispatch.planFinishDate, [Validators.required]],
            opNo1: [this.dispatch.OpNo1, [Validators.required]],
            opNo2: [this.dispatch.OpNo2, [Validators.required]],
            // interval: [this.dispatch.interval, [ZjftValidators.required]],
            clrCenterName: [this.dispatch.clrCenterName, [Validators.required]],
        });
    }

    qryUsersInAddNotesGroupForKey() {
        const params = {};
        this.service.qryUsersInAddNotesGroup(params)
            .subscribe(_data => {
                this.qryUsersInAddNotesGroup = _data['retList'];
            }, (error) => {
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    submit() {

        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }

        if (this.validateForm.invalid) {
            return;
        }

        if (this.validateForm.controls.opNo1.value === this.validateForm.controls.opNo2.value) {
            this.message.warning('不能选择同一加钞人员');
            return;
        }

        const params = this.validateForm.value;
        params['taskNo'] = this.dispatch.taskNo;

        this.loading = true;
        this.service.assignTo(params).subscribe(_data => {
            this.loading = false;
            this.message.success('人员分配成功！');
            this.subject.triggerOk();
        }, (error) => {
            if (error instanceof HttpResponse) {
                this.loading = false;
                this.message.error(error.body.retMsg);
            }
        });
    }
}

