import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { Page } from '../../../../models/page';
import { SYS_CONS } from '../../../../models/constant';
import { AppService } from 'app/app.service';
import { SpecialRuleExecService } from './special-rule-exec.service';
import { SpecialRuleExecAddComponent } from './special-rule-exec-add/special-rule-exec-add.component';
import { SessionService } from '@core';

@Component({
    templateUrl: 'special-rule-exec.html',
})

export class SpecialRuleExecComponent implements OnInit {

    formModel = {};
    loading = true;
    dataSet = [];
    startTime;
    endTime;
    page = new Page();
    PAGESIZE_SELECTOR = SYS_CONS.PAGESIZE_SELECTOR;
    statuslist = [
        { label: '未执行', value: 0 },
        { label: '执行中', value: 1 },
        { label: '过期无效', value: 2 },
        { label: '已取消', value: 3 },
    ];
    curOrg = {
        no: this.session.orgNo,
        name: this.session.orgName,
        orgType: this.session.userInfo.sysOrg.no
    };

    constructor(private modal: NzModalService,
        private message: NzMessageService,
        private appservice: AppService,
        private session: SessionService,
        private service: SpecialRuleExecService) {
    }


    ngOnInit() {
        this.refreshData(true);
    }

    reset(){
        this.formModel['orgNoFilter'] = {no: this.curOrg.no, name: this.curOrg.name};;
        this.refreshData(true);
    }

    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
        }
        this.loading = true;
        const params = _.extend(this.page);
        new Date().getDate()
        params['startDate'] = this.formattingData(this.formModel['startDate']) ? this.formattingData(this.formModel['startDate']) : this.formattingData(new Date());
        params['endDate'] = this.formattingData(this.formModel['endDate'])  ?  this.formattingData(this.formModel['endDate']) : this.formattingData(new Date());
        params['devNo'] = this.formModel['devNo'] ? this.formModel['devNo'] : '';
        params['addnotesRuleId'] = this.formModel['addnotesRuleId'] ? this.formModel['addnotesRuleId'] : '';
        params['orgNoFilter'] = this.formModel['orgNoFilter'] ? this.formModel['orgNoFilter'].no : '';
        params['status'] = this.formModel['status'] || this.formModel['status'] === 0 ? this.formModel['status'] : null
        this.service.page(params)
            .subscribe(_data => {
                this.loading = false;
                this.dataSet = _data['retList'];
                this.page.totalRow = _data['totalRow'];
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    openAdd() {
        const AddModal = this.modal.create({
            nzTitle: '添加执行特殊规则管理',
            nzWidth: 900,
            nzFooter: null,
            nzContent: SpecialRuleExecAddComponent,
            nzOnOk: () => {
                this.refreshData(true);
            }
        });
    }

    delete(data) {
        console.log("*************************" +data['devNo'] );
        console.log("*************************" +data['startDate'] );
        console.log("*************************" +data['endDate'] );
        this.service.delete(data)
            .subscribe(_data => {
                this.message.success('删除成功！');
                this.refreshData(true);
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    search() {
        this.refreshData(true);
    }

    formattingData(data) {
        if (typeof data != 'string' && data) {
            const year = data.getFullYear() + '-';
            const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) + '-' : (data.getMonth() + 1) + '-';
            const day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();

            data = year + month + day;
        }
        return data;
    }

}
