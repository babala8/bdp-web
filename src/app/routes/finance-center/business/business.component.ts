import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import {Page} from '../../../models/page';
import { AppService } from 'app/app.service';
import { FinanceCenterService } from '../finance-center.service';
import { SessionService } from '@core/session.service';

@Component({
  templateUrl: './business.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `],
})
export class BusinessComponent implements OnInit {

  loading = false;
  dataSet = [];
  page = new Page();
  formModel = {};
  interval;

  // txTypes = SYS_CONS.TX_TYPES;

  curOrg = {
    no: this.session.orgNo,
    name: this.session.orgName,
    orgType: this.session.userInfo.sysOrg.no
};

  constructor(private service: FinanceCenterService,
              private modal: NzModalService,
              private message: NzMessageService,
              private session: SessionService,
              private appService: AppService,
              ) {
  }

  ngOnInit() {
    this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
    this.refreshData(true);
  }

  ngOnDestroy() {
  }

  txTypes = [
    {name:'网点解现登记',no:1},
    {name:'网点解现入库',no:2},
    {name:'库存临时轧帐',no:3},
    {name:'库存日终轧帐',no:4},
    {name:'款箱金库出库',no:5},
    {name:'网点接库确认',no:6},
    {name:'调拨出库-金库间',no:7},
    {name:'调拨入库-金库间',no:8},
    {name:'调拨入库-人民银行',no:9},
    {name:'调拨出库-人民银行',no:10},
    {name:'外币现金调拔入库',no:11},
    {name:'外币现金调拔出库',no:12},
    {name:'贵金属收货入库',no:13},
    {name:'贵金属退货出库',no:14},
    {name:'上门服务业务',no:15},
    {name:'差错处理',no:16},
    {name:'自助机具(外包)',no:17},
    {name:'自助机具（自营）',no:87},
  ];

  cashTypes = [
    {name:'收入',no:1},
    {name:'支出',no:2},
  ];

  txStatuss = [
    {name:'交易成功',no:1},
    {name:'重发成功',no:2},
    {name:'冲正成功',no:3},
    {name:'交易失败',no:4},
    {name:'重发失败',no:5},
    {name:'冲正失败',no:6},
  ];

  refreshData(rest = false) {
    if (rest) {
      this.page.curPage = 1;
    }
    this.loading = true;
    let params = {
      pageSize: this.page.pageSize,
      curPage: this.page.curPage,
      totalRow: this.page.totalRow,
      totalPage: this.page.totalPage,
      orgNo:this.formModel['org'].no || '',
      txType:this.formModel['txType'] || '',
    };
    console.log(this.formModel);

    this.service.getBusinessInfo(params)
      .subscribe(_data => {
        console.log(_data);
        this.loading = false;
        this.page.totalRow = _data['totalRow'];
        this.dataSet = _data['retList'];
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

  reset() {
    this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
    this.formModel['txType'] = null;
    this.refreshData(true);
  }

}
