import { Component, OnInit} from '@angular/core';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { DtdLineArrangeService } from '../dtd-line-arrange.service';
import { DtdLineArrangeModComponent } from '../dtd-line-arrange-mod/dtd-line-arrange-mod.component';

@Component({
  templateUrl: './dtd-line-arrange-detail.html',
})
export class DtdLineArrangeDetailComponent implements OnInit{
  dataPrams;
  isEdit;
  dataSet = [];
  loading = true;
  constructor(
    private service: DtdLineArrangeService,
    private modal: NzModalService,
    private messege: NzMessageService
  ){
    service.status=false;
  }

  ngOnInit() {
    console.log(this.dataPrams)
    this.dataSet=[];
    this.refreshData();
  }

  refreshData(){
    const params = {
      lineNo: this.dataPrams.lineNo,
      theYearMonth: this.dataPrams.theYearMonth
    }
    this.service.getDetail(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _.sortBy(_data.retList, 'theDay');
      });
  }

  openLine(data,isEdit){
    const modal = this.modal.create({
      nzTitle: '上门线路排班信息',
      nzContent: DtdLineArrangeModComponent,
      nzWidth: 1000,
      nzComponentParams: {
        dtdDetail: data,
        isEdit: isEdit
      },
      nzOnOk: () => {
        this.service.status=true;
        this.refreshData()
      },
      nzOnCancel: () => {
      },
      nzFooter: null,
    });
  }
}
