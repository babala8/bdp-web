import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { AddPostScheduleWeekComponent } from './week/add/add-postSchedule-week.component';
import { AddPostScheduleMonthComponent } from './month/add/add-postSchedule-month.component';
import { SessionService } from '@core/session.service';
import { SYS_CONS } from "../../../../../models/constant";
import { PostScheduleService } from "../../post-schedule.service";

@Component({
    templateUrl: './add-postSchedule-submit.html',
})

export class AddPostScheduleSubmitComponent implements OnInit {
    validateForm: FormGroup;
    loading;

    mouldTypes = SYS_CONS.MOULD_TYPES;
    postInfos;
    formModel = {};

    constructor(private fb: FormBuilder,
                private service: PostScheduleService,
                private modal: NzModalService,
                private message: NzMessageService,
                private nzSub: NzModalRef,
                private session: SessionService) {
    }

    curOrg = {
        no: this.session.orgNo,
        name: this.session.orgName,
        orgType: this.session.userInfo.sysOrg.no
    };

    ngOnInit() {
        this.service.getAllPost()
            .subscribe(_data => {
                console.log(_data);
                this.postInfos = _data['retList'];
                }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });


        this.validateForm = this.fb.group({
            mouldName: [null, [Validators.required]],
            org: [{no: this.curOrg.no, name: this.curOrg.name}, [Validators.required]],
            mouldType: [null, [Validators.required]],
            postInfo: [null, [Validators.required]],
        });
    }

    add() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }

        if (this.validateForm.invalid) {
            return;
        }

        const params =  this.validateForm.value;
        console.log(params)
        const params1 = {};
        params1['orgNo'] = params['org']['no'];
        params1['mouldType'] = params['mouldType'];
        params1['postNo'] = params['postInfo'];
        params1['mouldName'] = params['mouldName'];


        if(params['mouldType'] == 1) {
            this.modal.create({
                nzTitle: '分配人员',
                nzWidth: '80%' ,
                nzFooter: null,
                nzContent: AddPostScheduleWeekComponent,
                nzComponentParams: {
                  data: params1,
                },
                nzOnOk: () => {
                  this.nzSub.triggerOk();
                },
                nzOnCancel: () => {
                },
              });
        }else if(params['mouldType'] == 2) {
            this.modal.create({
                nzTitle: '分配人员',
                nzWidth: '80%' ,
                nzFooter: null,
                nzContent: AddPostScheduleMonthComponent,
                nzComponentParams: {
                  data: params1,
                },
                nzOnOk: () => {
                  this.nzSub.triggerOk();
                },
                nzOnCancel: () => {
                },
              });
        }


    }

    // getFormControl(name) {
    //     return this.validateForm.controls[name];
    // }

}
