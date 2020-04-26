import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../channel-center.service';
import { DevVendorAddComponent } from './add/dev-vendor-add.component';
import { DevVendorModifyComponent } from './mod/dev-vendor-modify.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  templateUrl : './dev-vendor.component.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `]
})

export class DevVendorComponent implements OnInit {
  dataList = [];
  formModel = {};

  constructor(private service: ChannelCenterService,
              private nzModal: NzModalService,
              private message: NzMessageService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    const params = {
      name : this.formModel['name'] || ''
    };
    this.service.getDevVenders(params)
        .subscribe(_data => {
          console.log(_data);
          this.dataList = _data['retList'];
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

  openAdd () {
    const modal = this.nzModal.create({
      nzTitle: '添加设备品牌',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: DevVendorAddComponent,
      nzOnOk: () => {
        this.refreshData();
      },
      nzOnCancel: () => {
      },
    });
  }

  openModify(item) {
    const modal = this.nzModal.create({
      nzTitle: '修改设备品牌',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: DevVendorModifyComponent,
      nzComponentParams: {
        devVendor: item
      },
      nzOnOk: () => {
        this.refreshData();
      },
      nzOnCancel: () => {
      },
    });
  }

  confirmDel(no) {
    const params = {
      data: {no: no},
      type: 'del'
    };
    this.service.delDevVendors(no)
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
}
