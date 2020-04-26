import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../../../../models/page';
import { SYS_CONS } from '../../../../models/constant';
import { AppService } from 'app/app.service';
import { SpecialDateService } from './special-date.service';
import { SpecialDateModComponent } from './special-date-mod/special-date-mod.component';
import { SpecialDateAddComponent } from './special-date-add/special-date-add.component';

@Component({
    templateUrl: './special-date.html',
})

export class SpecialDateComponent implements OnInit {

    formModel = {};
    loading = true;
    dataSet = [];
    startTime;
    endTime;
    page = new Page();
    PAGESIZE_SELECTOR = SYS_CONS.PAGESIZE_SELECTOR;

    constructor(
        private modal: NzModalService,
        private message: NzMessageService,
        private appservice: AppService,
        private service: SpecialDateService
    ) { }

    ngOnInit() {
        this.reset();
    }

    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
        }
        this.loading = true;
        const params = _.extend({}, this.page, this.formModel);
        params['specialDateStart'] = this.formattingData(this.formModel['specialDateStart']);
        params['specialDateEnd'] = this.formattingData(this.formModel['specialDateEnd']);

        console.log(params)

        this.service.page(params)
            .subscribe(_data => {
                this.dataSet = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.loading = false;
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });

    }

    openAdd() {
        const AddModal = this.modal.create({
            nzTitle: '增加特殊日期配钞设置',
            nzWidth: 900,
            nzFooter: null,
            nzContent: SpecialDateAddComponent,
            nzOnOk: () => {
                this.refreshData(true);
            }
        });
    }

    openModify(data) {
        const ModifyModal = this.modal.create({
            nzTitle: '修改特殊日期配钞设置',
            nzWidth: 900,
            nzFooter: null,
            nzContent: SpecialDateModComponent,
            nzComponentParams: {
                data: data
            },
            nzOnOk: () => {
                this.refreshData();
            }
        });
    }

    delete(data) {
        const params = {
            clrCenterNo: data.clrCenterNo,
            endDate: data.endDate,
            startDate: data.endDate,
        };
        console.log(params)
        this.service.delete(params)
            .subscribe(_data => {
                this.message.success('删除成功！');
                this.refreshData(true);
            }, error => {
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

    reset() {
        this.formModel = {
            specialDateStart: null,
            specialDateEnd: null
        };
        this.refreshData(true);
    }

    _startValueChange = () => {
        if (this.formModel['startDate'] > this.formModel['endDate']) {
            this.formModel['endDate'] = null;
        }
    };

    _endValueChange = () => {
        if (this.formModel['startDate'] > this.formModel['endDate']) {
            this.formModel['startDate'] = null;
        }
    };
    
    _disabledStartDate = (startValue) => {
        if (!startValue || !this.formModel['endDate']) {
            return false;
        }
        return startValue.getTime() > this.formModel['endDate'].getTime();
    };

    _disabledEndDate = (endValue) => {
        if (!endValue || !this.formModel['startDate']) {
            return false;
        }
        return endValue.getTime() < this.formModel['startDate'].getTime();
    };
}
