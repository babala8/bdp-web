import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './holiday-line-org-detail.html',
    styleUrls: ['./holiday-line-org-detail.less'],

})
export class HolidayLineOrgDetailComponent implements OnInit {
    lineRunMapDetail;
    networkList;
    runDate;
    constructor() {
    }

    ngOnInit() {
        this.runDate = this.lineRunMapDetail.theYearMonth + '-' + this.lineRunMapDetail.theDay;
        this.networkList = this.lineRunMapDetail.networkList;
    }
}

