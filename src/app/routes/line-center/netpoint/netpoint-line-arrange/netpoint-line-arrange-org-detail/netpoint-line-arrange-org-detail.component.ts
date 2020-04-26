import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {isCombinedNodeFlagSet} from "tslint";

@Component({
    templateUrl: './netpoint-line-arrange-org-detail.html',
    styleUrls: ['./netpoint-line-arrange-org-detail.less'],
})
export class NetpointLineArrangeOrgDetailComponent implements OnInit {
    lineWorkId;
    lineRunMapDetail;
    networkList;
    runDate;

    constructor() {
    }

    ngOnInit() {
        this.runDate = this.lineRunMapDetail.theYearMonth + '-' + this.lineRunMapDetail.theDay;
        this.networkList = this.lineRunMapDetail.detailList;
    }
}

