import {Component, OnInit} from '@angular/core';
import {SYS_CONS} from "../../../../models/constant";
import { ClearCenterService } from '../../clear-center.service';


@Component({
  selector: 'app-ATM-inventory-detail',
  templateUrl: './ATM-inventory-detail.html'
})
export class ATMInventoryDetailComponent implements OnInit {
  data;
  detailList;
  loading=true;
  dataList = [];
  taskStatus = SYS_CONS.STATE.ADDNOTE_TASK;

  constructor(
    private service: ClearCenterService
  ) {
  }

  ngOnInit() {
    console.log(this.data)
    this.getData()
    this.detailList = [
      {
        name: '任务单编号',
        value: this.data.taskNo
      },
      {
        name: '加钞线路',
        value: this.data.lineName
      },
      {
        name: '状态',
        value: this.data.status === null ? '' : this.taskStatus.find((myObj => myObj.value === this.data.status)).name
      }
    ];
  }

  getData(){
    this.service.getDetailAtmInventory(this.data.taskNo)
      .subscribe(_data => {
        this.loading = false;
        this.dataList = _data['retList'];
        this.dataList.forEach(dev => {
          dev.containerEntityDTOs = dev.cassetteNoList
        });
      }, () => this.loading = false)
  }
}
