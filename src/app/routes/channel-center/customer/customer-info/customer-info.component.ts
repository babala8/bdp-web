import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../../../../models/page';
import { ChannelCenterService } from '../../channel-center.service';
import { CustomerInfoAddComponent } from './add/customer-info-add.component';
import { CustomerInfoModifyComponent } from './mod/customer-info-modify.component';
import { CustomerInfoDetailComponent } from './detail/customer-info-detail.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerInfoReviseComponent } from './revise/customer-info-revise.component';

@Component({
    templateUrl : './call-customer.html',
    styles: [`
        a:hover {
          text-decoration: underline;
          color: #23527c;
        }
  `]
})

export class CustomerInfoComponent implements OnInit {
    dataList = [];
    formModel = {};
    loading = false;
    page = new Page();
    expandForm = false;
    lines = [];
    isOneselfs = [{'label':'是','value':'1'},{'label':'否','value':'0'}];
  callCustomerTypeList = [];


    constructor(private fb: FormBuilder,
                private service: ChannelCenterService,
                private nzModal: NzModalService,
                private message: NzMessageService,
                ) {}

    ngOnInit(): void {
        this.refreshData();
        this.qryAllLine();
        this.qryAllCallCustomerType();
    }

    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
        }
        const params = {
           cnCustomerLongName: this.formModel['cnCustomerLongName'] || '',
           address: this.formModel['address'] || '',
           customerNumber: this.formModel['customerNumber'] || '',
           isOneself: this.formModel['isOneself'] || '',
           callCustomerLine: this.formModel['callCustomerLine'] || '',
           callCustomerType: this.formModel['callCustomerTypeNo'] || '',
           pageSize: this.page.pageSize,
           curPage: this.page.curPage,
        };

        this.service.getCallCustomers(params)
            .subscribe(_data => {
              this.dataList = _data['retList'];
              this.loading = false;
              this.page.totalRow = _data['totalRow'];
              this.page.totalPage = _data['totalPage'];
              console.log(this.page)
            }, (error) => {
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    search() {
        this.refreshData(true);
    }

    openAdd() {
        this.nzModal.create({
            nzTitle: '添加客户',
            nzFooter: null,
            nzWidth: '80%',
            nzZIndex: 990,
            nzMaskClosable: false,
            nzContent: CustomerInfoAddComponent,
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {
            },
        });
    }

    openModify(item) {
        this.nzModal.create({
            nzTitle: '修改客户',
            nzMaskClosable: false,
            nzFooter: null,
            nzWidth: '80%',
            nzZIndex: 990,
            nzContent: CustomerInfoModifyComponent,
            nzComponentParams: {
                callCustomer: item
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
            nzTitle: '客户详情',
            nzMaskClosable: false,
            nzFooter: null,
            nzWidth: '80%',
            nzZIndex: 990,
            nzContent: CustomerInfoDetailComponent,
            nzComponentParams: {
                callCustomer: item
            },
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {
            },
        });
    }

    confirmDel(no) {
        this.service.delCallCustomers(no)
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

    validateForm: FormGroup;
    qryAllLine() {
        this.lines = [];
        // this.formModel[callCustomerLine].setValue(null);
        this.service.qryAllLine({"lineType":2})
            .subscribe(_data => {
                this.lines = _data.retList;
            });
    }

    modCircle(item) {
        const reviseModal = this.nzModal.create({
          nzTitle: '客户加钞周期调整',
          nzFooter: null,
          nzWidth: '80%',
          nzContent: CustomerInfoReviseComponent,
          nzComponentParams: {
            callCustomerTime: item
          },
          nzOnOk: () => {
            this.search();
          },
          nzOnCancel: () => {
          },
        });
    }

    cancel() {}

  // 查询所有客户类型
  qryAllCallCustomerType() {
    this.service.getCallCustomerTypeList().subscribe(_data => {
      this.callCustomerTypeList = _data.retList;
    })
  }
}
