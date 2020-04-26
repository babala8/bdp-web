import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {AppService} from 'app/app.service';
import {ATMLineArrangeService} from '../atm-line-arrange.service';
import {ATMLineArrangeDevMapComponent} from '../ATM-line-arrange-dev-map/ATM-line-arrange-dev-map.component';
import {ATMLineArrangeDevDetailComponent} from '../ATM-line-arrange-dev-detail/ATM-line-arrange-dev-detail.component';

@Component({
  templateUrl: './atm-line-arrange-day-detail.html'
})
export class ATMLineArrangeDayDetailComponent implements OnInit {
  loading = false;
  lineRunMapDetailInfoList = [];
  theYearMonth;
  lineNo;
  devCountAM;
  devCountPM;
  devListAM = [];
  devListPM = [];

  constructor(
    private appService: AppService,
    private service: ATMLineArrangeService,
    private message: NzMessageService,
    private modal: NzModalService,) {
  }

  ngOnInit() {
    this.refreshData();
  }

  dataProcess() {
    this.lineRunMapDetailInfoList.forEach(data => {
      this.devCountAM = 0;
      this.devCountPM = 0;
      this.devListAM = [];
      this.devListPM = [];
      const devListArr = []
      data.detailList.forEach(dev => {
        devListArr.push(dev.customerNo)
        if (dev.clrTimeInterval == 1) {
          this.devCountAM += 1;
          this.devListAM.push(dev.customerNo);
        } else if (dev.clrTimeInterval == 2) {
          this.devListPM.push(dev.customerNo);
          this.devCountPM += 1;
        }
      })
      data.devListArr = devListArr;
      data.devListAM = this.devListAM.join(',');
      data.devListPM = this.devListPM.join(',');
      data.devListAMMultiLine = this.devListAM.join('\r\n');
      data.devListPMMultiLine = this.devListPM.join('\r\n');
      data.devCountAM = this.devCountAM;
      data.devCountPM = this.devCountPM;
    });
  }

  openRunMapDevDetail(lineRunMapDetailInfo) {
    const nzModalSubject = this.modal.create({
      nzTitle: `ATM线路排班设备信息[${lineRunMapDetailInfo.lineName}]`,
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: ATMLineArrangeDevDetailComponent,
      nzWidth: '90%',
      nzZIndex: 1001,
      nzComponentParams: {
        lineRunMapDetail: lineRunMapDetailInfo,
      },
    });
  }

  refreshData() {
    this.loading = true;
    this.service.qryLineRunMapDetail({
      lineNo: this.lineNo,
      theYearMonth: this.theYearMonth,
      type: 1,//运行图类型 1：设备；2：网点
    }).subscribe(_data => {
      this.loading = false;
      this.lineRunMapDetailInfoList = _data['element'];
      this.dataProcess();
    }, (error) => {
      this.loading = false;
      console.log(error);
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

  openGroupMap(data) {
    const mapModal = this.modal.create({
      nzTitle: '线路运行图设备详细信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: ATMLineArrangeDevMapComponent,
      nzWidth: '90%',
      nzZIndex: 1001,
      nzComponentParams: {
        lineData: data
      },
    });
  }

}

