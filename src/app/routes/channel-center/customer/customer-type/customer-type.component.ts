import {Component, OnInit} from '@angular/core';
import { Page } from '../../../../models/page';
import { ChannelCenterService } from "../../channel-center.service";

@Component({
    templateUrl : './customer-type.html',
    styles: [`
        a:hover {
          text-decoration: underline;
          color: #23527c;
        }
  `]
})
export class CustomerTypeComponent implements OnInit {
    dataList = [];
    formModel = {};
    loading = false;
    page = new Page();
    //For POC
    dataListForPOC = [{'callCustomerTypeName':'上门客户','callCustomerType':'1'},{'callCustomerTypeName':'人民银行','callCustomerType':'2'},{'callCustomerTypeName':'金交所','callCustomerType':'3'},{'callCustomerTypeName':'同业客户','callCustomerType':'4'},{'callCustomerTypeName':'合作单位','callCustomerType':'5'}];



    constructor(private customerTypeService: ChannelCenterService
                ) {}

    ngOnInit(): void {
        this.refreshData();
     }

    refreshData(reset = false) {
        if (reset) {
            this.page.curPage = 1;
        }
        const params = {
           no: this.formModel['callCustomerTypeNo'] || '',
           name: this.formModel['callCustomerTypeName'] || '',
           pageSize: this.page.pageSize,
           curPage: this.page.curPage,
        };

      this.loading = true;
      this.customerTypeService.getCallCustomerTypes(params)
        .subscribe(result => {
          this.dataList = result['retList'];
          this.page.totalRow = result['totalRow'];
          this.loading = false;
        });
    }

    search() {
        this.refreshData(true);
    }
}
