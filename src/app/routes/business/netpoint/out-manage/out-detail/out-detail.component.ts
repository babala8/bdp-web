import { NetPointService } from '../../netpoint.service';
import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../../models/constant';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  templateUrl: 'out-detail.html'
})

/**
 * 网点出库任务单 —— 详情
 */
export class OutDetailComponent implements OnInit {

  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  taskInfo;
  taskDetail;
  containerList = []; // 款箱列表
  selectedIndex = 0;
  recordList = [];
  statusList = [];
  statusTransitionList = [];

  constructor(private netPointService: NetPointService,
              private modalRef: NzModalRef) { }

  ngOnInit() {
    this.netPointService.qryTaskDetail(this.taskInfo.taskNo).subscribe(
      result => {
        this.taskDetail = result.retList[0];
        // this.detail.customer.containerList = taskDetail.taskEntityPOList.filter(item =>item.containerType == '4');
        this.containerList = this.dealEntity(this.taskDetail.taskEntityPOList);
      }
    );

    // 查询产品服务详情
    this.qryServiceDetail();

    // 查询任务单操作记录
    this.qryOperateRecord();
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  dealEntity(entityList) {
    let dealList = entityList.filter(item => {
      return !item.parentEntity;
    });
    dealList.forEach(entity => {
      entity.detailList = [];
      entityList.forEach(allContainer => {
        if (entity.entityNo === allContainer.parentEntity) {
          allContainer.taskEntityDetailDTOList.forEach(detail => {
            allContainer[detail.key] = detail.value;
          });
          entity.detailList.push(allContainer);
        }
      });
    });
    console.log(dealList);
    return dealList;
  }

  /**
   * 查询操作记录，处理数据
   */
  qryOperateRecord() {
    this.netPointService.qryOperateRecord(this.taskInfo.taskNo)
      .subscribe(result => {
        this.recordList = result['retList'];
      });
  }

  /**
   * 查询产品服务详情
   */
  qryServiceDetail() {
    this.netPointService.getServiceDetail(this.taskInfo.taskType)
      .subscribe(result => {
        this.statusTransitionList = result['statusConvertList'];
        this.statusList = result['statusList'];
      });
  }
}
