import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { NetpointLineManageService } from '../netpoint-line-manage.service';

@Component({
    templateUrl: './netpoint-line-manage-detail.html'
})
export class NetpointLineManageDetailComponent implements OnInit {
    validateForm: FormGroup;
    loading = false;
    clrCenterList = [];
    lineDetailInfoList;
    clrCenterNo;
    editCache = {};
    constructor(private fb: FormBuilder,
        private service: NetpointLineManageService,
        private nzModal: NzModalRef,
        private session: SessionService,
        private message: NzMessageService) {
    }

    ngOnInit() {
    }
}

