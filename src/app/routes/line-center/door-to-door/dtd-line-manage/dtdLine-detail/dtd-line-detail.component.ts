import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import { DtdLineManageService } from '../dtd-line-manage.service';

@Component({
    templateUrl: './dtd-line-detail.html'
})
export class DtdLineDetailComponent implements OnInit {
    validateForm: FormGroup;
    loading = false;
    clrCenterList = [];
    lineDetailInfoList;
    clrCenterNo;
    editCache = {};
    constructor(private fb: FormBuilder,
        private service: DtdLineManageService,
        private nzModal: NzModalService,
        private session: SessionService,
        private message: NzMessageService) {
    }

    ngOnInit() {
    }
}

