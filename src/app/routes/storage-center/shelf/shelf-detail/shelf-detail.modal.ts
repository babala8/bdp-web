import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {FormBuilder} from "@angular/forms";
import {StorageCenterService} from "../../storage-center.service";
import {SHELF} from "../../../../models/constant";

@Component({
  selector: 'app-shelf-detail-modal',
  templateUrl: 'shelf-detail.modal.html',
  styles: [`
    input, nz-input-number {
      border-radius: 0;
    }
  `]
})
/**
 * 笼车/托盘详细信息
 */
export class ShelfDetailComponent implements OnInit {
  loading = false;
  // 笼车/托盘类型
  allType = SHELF.SHELF_TYPE;
  // 笼车/托盘状态
  allStatus = SHELF.SHELF_STATUS;
  modShelf: any;
  entityNoList = [];

  constructor(private modalRef: NzModalRef,
              private fb: FormBuilder,
              private service: StorageCenterService,
              private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.getItemList();
  }

  /**
   * 获取物品列表
   */
  getItemList() {
    this.loading = true;
    this.service.qryShelfDetail(this.modShelf.shelfNo)
      .subscribe(result=>{
        this.entityNoList = result['entityNolist'];
        this.loading = false;
        },error=>{
        this.loading = false;
        this.message.error('物品列表获取失败');
      });
  }

}
