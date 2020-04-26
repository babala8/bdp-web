import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../../../models/page';
import {CAR, SYS_CONS} from '../../../models/constant';
import { GeneralManagementService } from "../general-management.service";
import { ArmoredCarAddComponent } from "./add/armoredCar-add.component";
import { ArmoredCarAddMutipleComponent } from "./add/armoredCar-add-mutiple.component";
import { ArmoredCarModComponent } from "./mod/armoredCar-mod.component";

/**
 * 押运车管理
 */
@Component({
  selector: 'app-armored-car',
  templateUrl: './armored-car.component.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})
export class ArmoredCarComponent implements OnInit {
    car_status=SYS_CONS.CAR_STATUS;
    // 车辆状态
    statusList = CAR.CAR_STATUS;
    // 车辆类型
    typeList = CAR.CAR_TYPE;
    //押运车签约方式
  singingType = CAR.SINGING_TYPE;
    dataList = [];
    loading = false;
    page = new Page();
    formModel = {};
  constructor(private nzModal: NzModalService,
              private message: NzMessageService,
              private session: SessionService,
              private armoredService: GeneralManagementService
  ) {
  }

  ngOnInit() {
    this.search();
  }
  search() {
    this.refreshData(true);
  }
  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      carNumber: this.formModel['carNumber'] ? this.formModel['carNumber'] : '',    //车牌号
      type: this.formModel['type'] ? this.formModel['type'] : '',   //车辆类型
      status: this.formModel['status'] ? this.formModel['status'] : '',   //车辆状态
      curPage: this.page.curPage,   //当前页码
      pageSize: this.page.pageSize,   //每页条数
    };
    this.loading = true;
    this.armoredService.getArmoredCar(params)
      .subscribe(_data => {
        this.dataList = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data['totalPage'];
        this.loading = false;
        console.log(this.page)
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  openAdd() {
    const addModal = this.nzModal.create({
      nzTitle: '添加车辆信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '40%',
      nzZIndex: 990,
      nzContent: ArmoredCarAddComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 打开批量添加模态框
  openAddMutiple() {
    const nzModalSubject = this.nzModal.create({
      nzTitle: '批量添加车辆信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: ArmoredCarAddMutipleComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  openModify(item) {
    const modifyModal = this.nzModal.create({
      nzTitle: '修改车辆信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '40%',
      nzZIndex: 990,
      nzContent: ArmoredCarModComponent,
      nzComponentParams: {
        armoredCar: item
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  confirmDel(item) {
    this.armoredService.delArmoredCar(item.carNo)
      .subscribe(data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

}
