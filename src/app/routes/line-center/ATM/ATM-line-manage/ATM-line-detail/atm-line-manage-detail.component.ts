import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { ATMLineManageService } from '../atm-line-manage.service';

@Component({
    templateUrl: './atm-line-manage-detail.html'
})
export class ATMLineManageDetailComponent implements OnInit {
    validateForm: FormGroup;
    loading = false;
    clrCenterList = [];
    lineDetailInfoList;
    clrCenterNo;
    editCache = {};
    constructor(private fb: FormBuilder,
        private service: ATMLineManageService,
        private nzModal: NzModalService,
        private session: SessionService,
        private message: NzMessageService) {
    }

    ngOnInit() {
    }
}

