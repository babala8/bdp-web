import { Component, OnInit } from '@angular/core';
import{SYS_CONS} from '../../../../models/constant';

@Component({
  selector: 'app-detail-raeder-flow',
  templateUrl: './handhelds-receive-detail.component.html'
})

export class HandheldsReceiveDetailComponent implements OnInit {
  data;
  detailList;
  constructor() {
  }

  ngOnInit() {
    console.log(this.data)
    this.detailList = [
      {
        name: '读写器编号',
        value: this.data.tagReaderNo
      },
      {
        name: '领用人编号',
        value: this.data.requestOpNo
      },
      {
        name: '申请日期',
        value: this.data.requestDate
      },{
        name: '申请时间',
        value: this.data.requestTime
      },
      // {
      //   name: '审核人编号',
      //   value: this.data.grantOpNo
      // },
      // {
      //   name: '审核结果',
      //   value:this.data.reviewResult ? SYS_CONS.REVIEW_RESULT.find((myObj => myObj.no ==this.data.reviewResult)).name : '',
      // },
      // {
      //   name: '发放日期',
      //   value: this.data.grantDate
      // },
      // {
      //   name: '发放时间',
      //   value: this.data.grantTime
      // },
      {
        name: '归还人编号',
        value: this.data.returnOpNo
      },
      {
        name: '归还日期',
        value: this.data.returnDate
      },
      {
        name: '归还时间',
        value: this.data.returnTime
      },
      {
        name: '签收人编号',
        value: this.data.signOpNo
      },
      {
        name: '领用状态',
        value:SYS_CONS.TAGREADER_USE_STATUS.find((myObj => myObj.no ==this.data.tagReaderUseStatus)).name
      },
      {
        name: '紧急领用标志',
        value:SYS_CONS.CRASH_FLAG.find((myObj => myObj.no ==this.data.crashFlag)).name
      },
    ];

  }
}
