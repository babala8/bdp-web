import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'out-progress.html',
  styles: [`
    :host ::ng-deep .ant-steps-item-finish .ant-steps-item-icon {
      background-color: #1890ff;
      border-color: #1890ff;
    }
    :host ::ng-deep .ant-steps-item-finish svg {
      color: #fff !important;
    }
  `],
})

export class OutProgressComponent implements OnInit {
  data;
  detailList = [];
  currentProgress = 0;

  constructor() { }

  ngOnInit() {
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
        name: '出库日期',
        value: this.data.planFinishDate
      },
      {
        name: '押运线路',
        value: this.data.lineName

      },
    ];

    switch (this.data.status) {
      case 201:
        this.currentProgress = 0;
        break;
      case 301:
        this.currentProgress = 1;
        break;
      case 308:
        this.currentProgress = 2;
        break;
      case 307:
        this.currentProgress = 3;
        break;
      default:
        this.currentProgress = 0;
    }
  }

}
