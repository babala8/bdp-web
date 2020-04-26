import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import { HttpResponse } from '@angular/common/http';
import { KeyInfoAddComponent } from './add/keyInfo-add.component';
import { KeyInfoModComponent } from './mod/keyInfo-mod.component';
import {SYS_CONS} from "../../../../models/constant";
import {Page} from "../../../../models/page";
import {KeyService} from "../key.service";

@Component({
  selector: 'app-key-info',
  templateUrl: './key-info.component.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})
export class KeyInfoComponent implements OnInit {
  validateForm: FormGroup;
  formModel = {};
  useRanges=SYS_CONS.AREA_TYPES;
  keyPropertys=SYS_CONS.KEY_PROPERTYS;
  dataList = [];
  loading = true;
  page = new Page();
  staus=SYS_CONS.KEY_STATUS;


  constructor(private nzModal: NzModalService,
              private message: NzMessageService,
              private session: SessionService,
              private keyInfoService: KeyService
  ) {
  }

  ngOnInit() {
    this.refreshData(true);
  }


  search() {
    this.refreshData(true);
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      keyNo:this.formModel['key_no'] && this.formModel['key_no'].trim()|| '',
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      keyProperty:this.formModel['key_property'] || '',
      keyType: this.formModel['key_type'] && this.formModel['key_type'].trim()|| '',
      status: this.formModel['status'] || '',
      useRange:this.formModel['use_range'] || '',
      curPage: this.page.curPage,//当前页码
      pageSize: this.page.pageSize,//每页条数
    };
    this.loading = true;
    this.keyInfoService.getKeyInfo(params)
      .subscribe(_data => {
        this.dataList = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data['totalPage'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  openAdd() {
    const addModal = this.nzModal.create({
      nzTitle: '添加钥匙信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: KeyInfoAddComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  openModify(item) {
    const modifyModal = this.nzModal.create({
      nzTitle: '修改钥匙信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '80%',
      nzZIndex: 990,
      nzContent: KeyInfoModComponent,
      nzComponentParams: {
        keyInfo: item
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  confirmDel(no) {
    this.keyInfoService.delKeyInfo(no)
      .subscribe(data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }
}
