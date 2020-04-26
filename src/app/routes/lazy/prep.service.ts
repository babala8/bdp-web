import { Injectable, EventEmitter } from '@angular/core';

// 服务监听用于，设备效益排行、网点服务质量排行主页面与对应详情页面的数据通信

@Injectable()
export class PrepService {
  changeOrgNo: EventEmitter<number>;
  changeDevNo: EventEmitter<number>;

  constructor() {
    this.changeOrgNo = new EventEmitter();
    this.changeDevNo = new EventEmitter();
  }
}
