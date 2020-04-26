import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { SessionService } from '@core/session.service';
import {PostScheduleService} from "../../post-schedule.service";

@Component({
    templateUrl: './add-schedulePlan-submit.html',
})

export class AddSchedulePlanSubmitComponent implements OnInit {
    validateForm: FormGroup;
    loading;

    postInfos;
    scheduleMoulds;
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
        this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
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
        this.getMouldInfo();

    }

    getMouldInfo() {
        let params = {};
        params = _.extend(params, this.formModel);
        params['orgNo'] = this.formModel['org'].no || '';
        params['postNo'] = this.formModel['postInfo'];
        console.log(params);
        this.service.getMouldInfo(params)
          .subscribe(_data => {
            console.log(_data);
            this.scheduleMoulds = _data['retList'];
          }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
              this.message.error(error.body.retMsg);
            }
          });
      }

    add() {
        let params = {};
        params = _.extend(params, this.formModel);
        params['orgNo'] = this.formModel['org'].no || '';
        params['mouldNo'] = this.formModel['scheduleMould'];
        params['postNo'] = this.formModel['postInfo'];
        params['scheduleMonth'] = this.formModel['scheduleMonth'].format('YYYY-MM')

        this.service.addPostSchedulePlan(params).subscribe(_data => {
                this.message.success(`成功！`);
            }, (error) => {
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });

        this.nzSub.triggerOk();

    }

}
