import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../channel-center.service';
import { DevTypeAddComponent } from './add/dev-type-add.component';
import { DevTypeModifyComponent } from './mod/dev-type-modify.component';
import { DevTypeDetailComponent } from './detail/dev-type-detail.component';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../../../../models/page';

@Component({
    templateUrl : './dev-type.html',
    styles: [`
        a:hover {
          text-decoration: underline;
          color: #23527c;
        }
  `]
})
export class DevTypeComponent implements OnInit {
    dataList = [];
    formModel = {};
  loading = false;
  page = new Page();

    constructor(private service: ChannelCenterService,
                private nzModal: NzModalService,
                private message: NzMessageService) {}

    ngOnInit(): void {
        this.refreshData();
    }

    refreshData() {
        const params = {
            name: this.formModel['name'] || '',
          curPage: this.page.curPage,
        };

        this.service.getDevTypes(params)
            .subscribe(_data => {
              this.dataList = _data['retList'];
              this.loading = false;
              console.log(this.page)
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

    openAdd() {
        this.nzModal.create({
            nzTitle: '添加设备型号',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: DevTypeAddComponent,
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {
            },
        });
    }

    openModify(item) {
        this.nzModal.create({
            nzTitle: '修改设备型号',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: DevTypeModifyComponent,
            nzComponentParams: {
                devType: item
            },
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {
            },
        });
    }

    openDetail(item) {
        this.nzModal.create({
            nzTitle: '设备型号详情',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: DevTypeDetailComponent,
            nzComponentParams: {
                devType: item
            },
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {
            },
        });
    }

    confirmDel(no) {
        this.service.delDevTypes(no)
            .subscribe(_data => {
                console.log(_data);
                this.message.success('删除成功');
                this.refreshData();
            }, (error) => {
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }
    cancel() {}
    // getFormControl(name) {
    //     // return this.validateForm.controls[name];
    // }
}
