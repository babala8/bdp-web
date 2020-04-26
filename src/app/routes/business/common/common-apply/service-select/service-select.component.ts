import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../../../models/page';
import { CommonService } from '../../common.service';

@Component({
  templateUrl: './service-select.component.html',
  styles: [`
    :host ::ng-deep .serviceCard{
      height: 60px;
      text-overflow: ellipsis;
    }
    .serviceCard:hover {
      cursor: pointer;
      /*background-color: #F6F6F6;*/
      /*z-index: 2;*/
    }`],
})
export class ServiceSelectComponent implements OnInit {
  serviceDetail: {};
  serviceList = [];
  page = new Page();
  loading = false;
  constructor(private modal: NzModalService,
              private modalRef: NzModalRef,
              private commonService: CommonService) {}
  ngOnInit(): void {
    this.qryServiceList(true);
  }

  // 查询自定义产品列表
  qryServiceList(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {};
    Object.assign(params, this.page);
    this.loading = true;
    this.commonService.qryServiceForUse(params)
      .subscribe(result => {
        this.serviceList = result['retList'];
        this.page.totalRow = result['totalRow'];
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  // 选中自定义产品
  selectService(item) {
    this.commonService.qryServiceDetail(item.productNo)
      .subscribe(result => {
        this.serviceDetail = result;
        this.modalRef.triggerOk();
      })
  }
}
