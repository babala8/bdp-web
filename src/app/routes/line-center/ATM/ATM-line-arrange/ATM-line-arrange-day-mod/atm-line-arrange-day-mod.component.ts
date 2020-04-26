import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {AppService} from 'app/app.service';
import {ATMLineArrangeService} from '../atm-line-arrange.service';
import {ATMLineArrangeModComponent} from '../ATM-line-arrange-mod/atm-line-arrange-mod.component';

@Component({
  templateUrl: './atm-line-arrange-day-mod.html'
})
export class ATMLineArrangeDayModComponent implements OnInit {

  loading = false;
  lineRunMapDetailInfoList = [];
  theYearMonth;
  lineNo;
  devCountAM;
  devCountPM;
  devListAM;
  devListPM;

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
      data.detailList.forEach(dev => {
        console.log('dev:');
        console.log(dev);
        if (dev.clrTimeInterval == 1) {
          this.devCountAM += 1;
          this.devListAM.push(dev.customerNo);
        } else if (dev.clrTimeInterval == 2) {
          this.devListPM.push(dev.customerNo);
          this.devCountPM += 1;
        }
      })
      data.devListAM = this.devListAM.join(',');
      data.devListPM = this.devListPM.join(',');
      data.devListAMMultiLine = this.devListAM.join('\r\n');
      data.devListPMMultiLine = this.devListPM.join('\r\n');
      data.devCountAM = this.devCountAM;
      data.devCountPM = this.devCountPM;
    });
  }

  openRunMapDevMod(lineRunMapDetailInfo) {
    const nzModalSubject = this.modal.create({
      nzTitle: `修改ATM线路排班[${this.lineRunMapDetailInfoList[0].lineName}]`,
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: ATMLineArrangeModComponent,
      nzWidth: '90%',
      nzZIndex: 1000,
      nzComponentParams: {
        lineRunMapDetail: lineRunMapDetailInfo,
      },
      nzOnOk: () => {
        this.refreshData();
      },
      nzOnCancel: () => {
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
      console.log("lineRunMapDetailInfoList:\n");
      console.log(this.lineRunMapDetailInfoList);
      this.dataProcess();
    }, (error) => {
      this.loading = false;
      console.log(error);
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

}

