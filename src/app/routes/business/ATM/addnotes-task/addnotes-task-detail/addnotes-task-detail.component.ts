import { Component, OnInit } from '@angular/core';
import { AddnotesTaskService } from '../addnotes-task.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: 'addnotes-task-detail.html'
})

export class AddnotesTaskDetailComponent implements OnInit {

    loading = true;
    data;
    dispatchDetailGroups;
    detailList = [];
    customerNo;
    vendor;
    address;
    lineName;
    sortNo;
    devCatalog;
    amount;
    devList = {
      devName: '',
      devVendor: '',
      devCatalog: '',
      orgName: ''
    };
    selectedIndex = 0;
    recordList = [];
    firstRenderFlag = true;
    statusTransitionList = [];
    statusList = [];

  constructor(
        private service: AddnotesTaskService
    ) { }

    ngOnInit() {
      this.qryDetail();
      this.detailList = [
            {
                name: '任务编号',
                value: this.data.taskNo
            },
            {
                name: '所属金库',
                value: this.data.clrCenterName
            },
            {
                name: '加钞日期',
                value: this.data.planFinishDate
            },
            {
                name: '加钞线路',
                value: this.data.lineName

            },
        ];

      this.service.getServiceDetail(this.data['taskType'])
        .subscribe(result => {
          this.statusTransitionList = result['statusConvertList'];
          this.statusList = result['statusList'];
        });
      // 查询任务单操作记录
      this.qryOperateRecord();
    }

  // 查询操作记录，处理数据
  qryOperateRecord() {
    console.log('查询操作记录');
    this.service.qryOperateRecord(this.data.taskNo)
      .subscribe(result => {
        this.recordList = result['retList'];
      });
  }

    qryDetail() {
        this.service.qryDetail(this.data.taskNo )
            .subscribe(_data => {
                this.loading = false;
                this.dispatchDetailGroups = _data.retList[0];
                const params = {
                  curPage: 1,
                  pageSize: 10,
                  no: this.dispatchDetailGroups.customerNo
                };
              this.getDevInfos(params);
              this.getDetail(this.dispatchDetailGroups.addnotesPlanNo);
            });
    }

    getDevInfos(params) {
      this.service.getDevInfos(params)
        .subscribe(data =>{
          this.devList.devName = data.retList[0].devTypeTable.name;
          this.devList.devVendor = data.retList[0].devTypeTable.devVendor;
          this.devList.orgName = data.retList[0].sysOrg.name;
          this.getDevVenders(this.devList.devVendor);
      })
    }

    getDevVenders(dev) {
      const params = {};
      let venders = [];
      this.service.getDevVenders(params)
        .subscribe( data =>{
          venders = data.retList;
          venders.forEach(item =>{
            if(dev == item.no) {
              this.vendor = item.name;
            }else {
              return;
            }
          })
        })
    }

    getDetail(addnotesPlanNo){
      this.service.addnoteDetail(addnotesPlanNo)
        .subscribe(data =>{
          this.devCatalog = data.element.detailList[0].devCatalogName;
          this.lineName = data.element.detailList[0].devLineName;
          this.sortNo = data.element.detailList[0].sortNo;
          this.address = data.element.detailList[0].address;
          this.amount = data.element.addnotesPlan.planAddnotesAmt;
        });
    }
}
