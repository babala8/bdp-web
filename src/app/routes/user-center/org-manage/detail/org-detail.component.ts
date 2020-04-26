import {Component, OnInit} from '@angular/core';
import {OrgManageService} from '../org-manage.service';
import {Org} from '../../../../models/org';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    templateUrl: './org-detail.html',
})
export class OrgDetailComponent implements OnInit {

    validateForm: FormGroup;
    org: Org;
    cities: any;
    showFlag = 0;

    constructor(private orgService: OrgManageService, private fb: FormBuilder ) {
    }

    ngOnInit(): void {
        // 获取机构详细信息
      console.log(this.org);
        this.orgService.getOrg(this.org.no)
            .subscribe(org => {
              console.log(org);
                this.org = org;
                this.showFlag = this.org.clrCenterFlag || 0;
            });

    }
}
