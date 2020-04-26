import {Component, OnInit} from '@angular/core';
import {Page} from "../../../models/page";
import {HttpResponse} from "@angular/common/http";
import * as _ from 'lodash';
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {StorageCenterService} from "../storage-center.service";
import {ShelfAddComponent} from "./shelf-add/shelf-add.modal";
import {ShelfModComponent} from "./shelf-mod/shelf-mod.modal";
import {SHELF} from "../../../models/constant";
import {ShelfDetailComponent} from "./shelf-detail/shelf-detail.modal";

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
})
export class ShelfComponent implements OnInit {
  page = new Page();
  formModel = {};
  retList = [];
  dataSet = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  loading = false;
  // 笼车/托盘类型
  allType = SHELF.SHELF_TYPE;
  // 笼车/托盘状态
  allStatus = SHELF.SHELF_STATUS;
  isAllDisplayDataChecked: boolean;
  numberOfChecked = 0;
  numberOfEnableChecked = 0;
  isOperating: boolean = false;

  ngOnInit(): void {
    this.refreshData()
  }

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private service: StorageCenterService,
  ) {
  }

  /**
   * 刷新表格数据
   * @param reset
   */
  refreshData(reset = false) {
    this.loading = true;
    if (reset) {
      this.page.curPage = 1;
    }

    const params = {
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      type: this.formModel['type'] || '',
      status: this.formModel['status'] || '',
      shelfNo: this.formModel['shelfNo'] || '',
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
    };


    this.service.qryShelfList(params)
      .subscribe(_data => {
        this.retList = _data['retList'];
        // 将服务端返回的数据格式化层界面可显示的内容
        this.dataSet = this.formatViewData(this.retList, this.allType, this.allStatus);
        this.page.totalRow = _data['totalRow'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  /**
   * 将服务器返回的原始数据格式化成界面可显示的内容
   * @param retList
   */
  formatViewData(retList: any[], allType, allStatus) {
    const items = [];
    retList.forEach(item => {
      items.push({
        shelfNo: item.shelfNo || '',
        centerName: item.centerName || '',
        type: item.type == null ? '' : allType[item.type].nzLabel,
        status: item.status == null ? '' : allStatus[item.status].nzLabel,
        volume: item.volume || '',
        changeStatusBtnText: item.status != 2 ? '启用' : '停用',
        checkDisabled: item.status != 2 ? false : true
      });
      if (item.status != 2) {
        this.mapOfCheckedId[item.shelfNo] = this.isAllDisplayDataChecked;
      }
    })
    this.numberOfChecked = this.retList.filter(item => this.mapOfCheckedId[item.shelfNo]).length;
    this.numberOfEnableChecked = this.retList.filter(item => item.status != 2).length;
    if (this.numberOfEnableChecked === 0) {
      this.isAllDisplayDataChecked = false;
    }
    return items;
  }

  /**
   * 重置搜索框的值
   */
  reset() {
    _.extend(this.formModel, {
      clrCenterNo: null,
      type: null,
      status: null,
      shelfNo: null,
      curPage: null,
      pageSize: null,
    });
    this.refreshData();
  }

  /**
   * 打开添加笼车/拖盘的页面
   */
  openAdd() {
    this.modal.create({
      nzTitle: '添加笼车/拖盘信息',
      nzContent: ShelfAddComponent,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 199,
      nzOnOk: result => {
        this.refreshData(false);
      }
    });
  }

  /**
   * 执行删除操作
   * @param shelfNo 笼车/托盘的编号
   */
  delete(shelfNo) {
    this.service.deleteShelf(shelfNo)
      .subscribe(result => {
        if (result.retCode === '00') {
          this.message.success('删除成功！');
          this.refreshData(false);
        } else {
          this.message.error('删除失败！');
        }
      }, err => {
        this.message.error('删除失败！');
      });
  }

  /**
   * 打开笼车/托盘信息修改的页面
   * @param index
   */
  openModify(index: number) {
    const shelf = this.retList[index];
    if (shelf) {
      this.modal.create({
        nzTitle: '修改笼车/拖盘信息',
        nzContent: ShelfModComponent,
        nzFooter: null,
        nzWidth: '60%',
        nzZIndex: 199,
        nzComponentParams: {
          modShelf: shelf,
        },
        nzOnOk: result => {
          this.refreshData(false);
        }
      });
    }
  }

  /**
   * 批量启用笼车
   */
  batchStartShelf() {
    let checkedShelfList = this.dataSet.filter(item => !item.checkDisabled)
      .filter(item => this.mapOfCheckedId[item.shelfNo]);
    let tempArray = [];
    if (checkedShelfList.length > 0) {
      checkedShelfList.forEach(item => {
        tempArray.push(item.shelfNo);
      })
      let shelfNos = tempArray.join(',');
      const params = {shelfNo: shelfNos, status: 2};
      this.isOperating = true;
      this.service.editShelf(params).subscribe(result => {
        if (result.retCode === '00') {
          this.message.success('批量启用成功！');
          this.checkAll(false);
          this.refreshData(false);
          this.refreshStatus();
        } else {
          this.message.success('批量启用失败！');
        }
        this.isOperating = false;
      }, error => {
        this.message.success('批量启用失败！');
        this.isOperating = false;
      })
    }

  }


  /**
   * 将笼车/托盘的状态设为停用
   * @param i
   */
  stopShelf(i: number) {
    const shelf = this.retList[i];
    if (shelf) {
      const params = {shelfNo: shelf.shelfNo, status: shelf.status != 2 ? 2 : 0}
      // 设置停用
      this.setStatus(params);
    }
  }

  /**
   * 批量设置状态
   * @param shelfList
   */
  setStatus(params) {
    this.service.editShelf(params)
      .subscribe(result => {
        if (result.retCode == '00') {
          this.message.success('状态设置成功！');
          this.mapOfCheckedId[params.shelfNo] = false;
          this.refreshData(false);
        } else {
          this.message.error('状态设置失败！');
        }
      }, error => {
        this.message.error('状态设置失败！');
      });
  }

  checkAll(value: boolean) {
    this.dataSet.filter(item => !item.checkDisabled)
      .forEach(item => (this.mapOfCheckedId[item.shelfNo] = value));
    this.numberOfChecked = this.retList.filter(item => this.mapOfCheckedId[item.shelfNo]).length;
  }

  refreshStatus() {
    this.numberOfChecked = this.retList.filter(item => this.mapOfCheckedId[item.shelfNo]).length;
    this.isAllDisplayDataChecked = this.dataSet
      .filter(item => !item.checkDisabled)
      .every(item => this.mapOfCheckedId[item.shelfNo]);
  }


  showDetail(index) {
    const shelf = this.dataSet[index];
    if (shelf) {
      this.modal.create({
        nzTitle: '笼车/拖盘详细信息',
        nzContent: ShelfDetailComponent,
        nzFooter: null,
        nzWidth: '60%',
        nzZIndex: 199,
        nzComponentParams: {
          modShelf: shelf,
        },
        nzOnOk: result => {
          this.refreshData(false);
        }
      });
    }
  }
}
