import {Component, OnInit, } from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Page} from '../../../models/page';
 import {SessionService} from '@core/session.service';
import {HttpResponse} from '@angular/common/http';
import {AppService} from '../../../app.service';
import {ParamsAddComponent} from './component/add/params-add.component';
import {ParamsModifyComponent} from './component/mod/params-modify.component';
import {SysParamsService} from "./sys-params.service";


@Component({
    templateUrl: './sys-params.html',
})
export class SysParamsComponent implements OnInit {

    formModel = {};
    dataList = [];
    loading = true;
    paramCatalogList: Array<any>;
    page = new Page();

    constructor(private appService: AppService,
                private service: SysParamsService,
                private modal: NzModalService,
                private message: NzMessageService,
                private session: SessionService) {
    }

    ngOnInit() {
        this.getAllParamType();
        this.refreshData();
    }

    getAllParamType(){
        this.service.qryParamTypeList()
        .subscribe(_data => {
            console.log(_data);
            this.paramCatalogList = _data['retList'];
        }, (error) => {
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    refreshData(reset = false) {
      if (reset) {
        this.page.curPage = 1;
      }
        this.loading = true;
         const formData = {
            catalog: this.formModel['catalog'] || '',
            paramName: this.formModel['paramName'] || '',
            statement: this.formModel['statement'] || '',
            description: this.formModel['description'] || ''
        };
        const params = Object.assign({},formData,this.page);
        // 获取当前页
        this.service.qryParamInfoList(params)
            .subscribe(_data => {
                console.log(_data);
                this.dataList = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.page.curRow = _data['curRow'];
                this.page.totalPage = _data['totalPage'];
                this.loading = false;
            }, (error) => {
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    search() {
        this.refreshData();
    }

    modify(paramInfo) {
        console.log(paramInfo);
        const modal = this.modal.create({
            nzTitle: '修改参数信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: ParamsModifyComponent,
            nzComponentParams: {
                paramInfo: paramInfo
            },
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {
            },
        });
    }

    openAdd() {
        const nzModalSubject = this.modal.create({
            nzTitle: '添加参数信息',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: ParamsAddComponent,
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {
            },
        });
    }


    confirmDel(id) {
        this.service.deleteParamById(id).subscribe(data => {
            this.refreshData();
            this.message.success('删除参数成功');
        }, (error) => {
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    cancel() {
    }

}
