import { Component, OnInit } from '@angular/core';
import { ChannelCenterService } from '../../../channel-center.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SYS_CONS } from '../../../../../models/constant';

@Component({
    templateUrl: './dev-manage-detail.html',
    styles: [`
        form>div {
            padding: 8px 0;
        }
    `]
})

export class DevManageDetailComponent implements OnInit {
    formModel = {};
    validateForm: FormGroup;
    devInfo;
    devType = [];
    org;
    devServiceList = [];
    lines = [];
    devTypeCashs=SYS_CONS.DEV_TYPE_CASH;

    constructor(
        private service: ChannelCenterService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            no: [{value: this.devInfo.no, disabled: true}],
            ip: [{value: this.devInfo.ip, disabled: true}],
            X: [{value: this.devInfo.x, disabled: true}],
            Y: [{value: this.devInfo.y, disabled: true}],
            orgNo: [{value: this.devInfo.sysOrg.no, disabled: true}],
            awayFlag: [{value: this.devInfo.awayFlag, disabled: true}],
            devType: [{value: this.devInfo.devType, disabled: true}],
            status: [{value: this.devInfo.status, disabled: true}],
            devService: [{value: this.devInfo.devService, disabled: true}],
            address: [{value: this.devInfo.address, disabled: true}],
            netType: [{value: this.devInfo.netType, disabled: true}],
            addnotesLine: [{value: this.devInfo.addnotesLineName, disabled: true}],
            addClrPeriod: [{value: this.devInfo.addClrPeriod, disabled: true}],
            maxAddClrPeriod: [{value: this.devInfo.maxAddClrPeriod, disabled: true}],
            cycleFlag: [{value: this.devInfo.cycleFlag, disabled: true}],
            city: [{value: this.devInfo.city, disabled: true}],
            // region: [this.devInfo.region],
            clrCenterNo: [{value: this.devInfo.clrCenterNo, disabled: true}],
            workType: [{value: this.devInfo.workType, disabled: true}],
            province: [{value: this.devInfo.province, disabled: true}],
            devTypeCash: [{value: this.devInfo.devTypeCash, disabled: true}],
            accountNetpoint:[{value: this.devInfo.accountNetpointName, disabled: true}],
          devLeastSize: [{value: this.devInfo.devLeastSize, disabled: true}],
          devStantardSize: [{value: this.devInfo.devStantardSize, disabled: true}],
        });
        this.getDevType();
        this.qryDevServiceCompany();
        // this.getClrCenterByClrNo(this.devInfo.clrCenterNo);
        // this.getOrg(this.devInfo.orgNo);
    }

    //
    // getOrg(orgNo) {
    //     this.orgService.getOrg(orgNo).subscribe(
    //         _data => {
    //             this.validateForm.controls.orgNo.setValue(_data.retData.name);
    //         });
    // }

    // getClrCenterByClrNo(clrCenterNo) {
    //     this.devService.getClrCenterByClrNo({clrCenterNo: clrCenterNo})
    //         .subscribe(_data => {
    //             this.validateForm.controls.clrCenterNo.setValue(_data.retData.centerName);
    //         });
    // }

    getDevType() {
        this.service.getDevTypes({})
            .subscribe(data => {
                this.devType = data['retList'];
            });
    }

    qryDevServiceCompany() {
        const params = [];
        this.service.qryDevServiceCompany(params)
            .subscribe(_data => {
                this.devServiceList = _data.retList;
            });
    }
}
