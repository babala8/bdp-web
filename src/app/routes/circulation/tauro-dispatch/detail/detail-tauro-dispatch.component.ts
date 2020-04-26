import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from "../../../../models/constant";
import { TauroDispatchService } from '../tauro-dispatch.service';

@Component({
  selector: 'app-detail-tauro-dispatch',
  templateUrl: './detail-tauro-dispatch.component.html'
})

export class DetailTauroDispatchComponent implements OnInit {
  data;
  detailList;
  loading=true;
  dataList = [];
  bagList = SYS_CONS.BAG_STATUS;
  bagTypeList = SYS_CONS.BAG_TYPE;
  cassetteOpList = SYS_CONS.CASSETTE_OP_TYPE;
  flagList = SYS_CONS.EX_FLAG;

  constructor(
    private service: TauroDispatchService
  ) {
  }

  ngOnInit() {
    console.log(this.data)
    this.getData()
    this.detailList = [
      {
        name: '任务单编号',
        value: this.data.dispatchNo
      },
      // {
      //   name: '执行状态',
      //   value: this.data.status === null ? '' : SYS_CONS.DISPATCH_STATUS.find((myObj => myObj.no == this.data.status)).name
      // },
      {
        name: '加钞线路',
        value: this.data.lineNo
      }, {
        name: '加钞日期',
        value: this.data.addDate
      },
      // {
      //   name: '加钞时间段',
      //   // value: this.data.bagDateSrcType
      //   value: this.data.clrTimeInterval === null ? '' : SYS_CONS.CLR_TIME_INTERVAL.find((myObj => myObj.no == this.data.clrTimeInterval)).name
      // },
      {
        name: '流转开始时间',
        value: this.data.cirStartTime || ''
      },
      {
        name: '流转结束时间',
        value: this.data.cirEndTime || ''
      },
      {
        name: '加钞人员1',
        value: this.data.addnotesOpName1 || ''
      },
      {
        name: '加钞人员2',
        value: this.data.addnotesOpName2 || ''
      },
      {
        name: '钥匙领用编号',
        value: this.data.keyUseNo || ''
      },
      {
        name: '手持机领用编号',
        value: this.data.tagReaderUseNo || ''
      },
      {
        name: '是否为紧急验收任务',
        value: this.data.urgentFlag === null ? '' : SYS_CONS.URGRNT_FLAG.find((myObj => myObj.no == this.data.urgentFlag)).name
      },
      // {
      //   name: '钞袋编号',
      //   value: this.data.bagNo
      // },
      // {
      //   name: '钞袋备注',
      //   value: this.data.bagNote
      // },
      // {
      //   name: '钞袋状态',
      //   value: this.data.bagStatus == null ? '' : SYS_CONS.BAG_STATUS.find((myObj => myObj.no == this.data.bagStatus)).name
      // }, {
      //   name: '钞袋类型',
      //   value: this.data.bagType == null ? '' : SYS_CONS.BAG_TYPE.find((myObj => myObj.no == this.data.bagType)).name
      // }, {
      //   name: '钞箱流转编号',
      //   value: this.data.cassetteCirculNo
      // }, {
      //   name: '钞箱数据来源',
      //   value: this.data.cassetteExFlag
      // }, {
      //   name: '钞箱编号',
      //   value: this.data.cassetteNo
      // }, {
      //   name: '钞箱1编号',
      //   value: this.data.cassetteNo1
      // }, {
      //   name: '钞箱2编号',
      //   value: this.data.cassetteNo2
      // }, {
      //   name: '钞箱3编号',
      //   value: this.data.cassetteNo3
      // }, {
      //   name: '钞箱4编号',
      //   value: this.data.cassetteNo4
      // }, {
      //   name: '钞箱备注',
      //   value: this.data.cassetteNote
      // }, {
      //   name: '钞箱操作类型',
      //   value: this.data.cassetteOpType == null ? '' : SYS_CONS.CASSETTE_OP_TYPE.find((myObj => myObj.no == this.data.cassetteOpType)).name
      // }, {
      //   name: '验收金额',
      //   value: this.data.checkAmt
      // }, {
      //   name: '钞箱确认/审核日期',
      //   value: this.data.confirmDate
      // }, {
      //   name: '钞箱确认/审核人员',
      //   value: this.data.confirmOpNo
      // }, {
      //   name: '钞箱确认/审核时间',
      //   value: this.data.confirmTime
      // }, {
      //   name: '关联的验收单编号',
      //   value: this.data.dataSrc
      // }, {
      //   name: '数据来源类型',
      //   value: this.data.dateSrcType
      // }, {
      //   name: '设备号',
      //   value: this.data.devNo
      // }, {
      //   name: '加钞任务单编号',
      //   value: this.data.dispatchNO
      // }, {
      //   name: '异常标志位',
      //   value: this.data.exFlag == null ? '' : SYS_CONS.EX_FLAG.find((myObj => myObj.no == this.data.exFlag)).name
      // }, {
      //   name: '逻辑ID',
      //   value: this.data.id
      // }, {
      //   name: '备注',
      //   value: this.data.note
      // }, {
      //   name: '钞箱操作日期',
      //   value: this.data.opDate
      // }, {
      //   name: '钞箱操作人员',
      //   value: this.data.opNo
      // }, {
      //   name: '钞箱操作时间',
      //   value: this.data.opTime
      // }, {
      //   name: '响应信息编码',
      //   value: this.data.retCode
      // }, {
      //   name: '响应信息',
      //   value: this.data.retMsg
      // }, {
      //   name: '钞箱袋入库日期',
      //   value: this.data.stockInDate
      // }, {
      //   name: '钞箱袋入库交接人',
      //   value: this.data.stockInOpNo
      // }, {
      //   name: '钞箱袋入库时间',
      //   value: this.data.stockInTime
      // }, {
      //   name: '钞箱袋出库日期',
      //   value: this.data.stockOutDate
      // }, {
      //   name: '钞箱袋出库交接人',
      //   value: this.data.stockOutOpNo
      // }, {
      //   name: '钞箱袋出库时间',
      //   value: this.data.stockOutTime
      // }, {
      //   name: '标签读写器编号',
      //   value: this.data.tagReaderNo
      // },

    ];
  }

  getData(){
    this.service.getDetailDispatchCirculation({dispatchNo: this.data.dispatchNo})
      .subscribe(_data => {
        this.dataList = _data['retList'];
        this.loading = false;
      })
  }
}
