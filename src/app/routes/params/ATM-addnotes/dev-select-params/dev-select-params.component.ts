import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { DevSelectParamsService } from './dev-select-params.service';

@Component({
    templateUrl: 'dev-select-params.html',
})
export class DevSelectParamsComponent implements OnInit {
    loading = false;
    formModel = {};
    dataSet = [{}];
    keyList = [];
    auxList = [];
    estList = [];
    auxparams = [];

    constructor(
        private message: NzMessageService,
        private service: DevSelectParamsService) {
    }

    ngOnInit() { }

    getDevConfig() {
        const params = { clrCenterNo: this.formModel['clrCenterNo'] };

        this.service.getDevConfig(params)
            .subscribe(_data => {
                this.keyList = _data['element'].keyList;
                this.estList = _data['element'].estList;
                this.auxList = _data['element'].auxList;
                this.auxparams = _data['element'].auxparams;
                this.auxList.forEach(data => {
                    data.auxparams = this.auxparams;
                });

                this.addCheed(this.keyList);
                this.addCheed(this.estList);
                this.addCheed(this.auxList);
            });
        this.keyList = [...this.keyList];
    }

    addCheed(datas) {
        datas.forEach(data => {
            if (data.isValid == 1) {
                data['state'] = true;
            } else {
                data['state'] = false;
            }
        });
    }

    changState(datas) {
        datas.forEach(data => {
            if (data.state) {
                data.isValid = 1;
            } else {
                data.isValid = 0;
            }
        });
    }

    modify(formCon) {
        this.loading = true;
        this.changState(this.keyList);
        this.changState(this.auxList);
        this.changState(this.estList);

        const params: any = { clrCenterNo: this.formModel['clrCenterNo'] };
        params.keyList = this.keyList;
        params.auxList = this.auxList;
        params.estList = this.estList;
        console.log("打印出关键列表"+this.keyList);
        this.service.devConfig(params)
            .subscribe(_data => {
                this.loading = false;
                this.message.success(_data.retMsg);
            }, error => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

}
