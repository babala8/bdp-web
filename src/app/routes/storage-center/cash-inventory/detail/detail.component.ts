import { Component } from '@angular/core';

/** 现金库库存详情 */
@Component({
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  data: any;
  detailInfo = {
    containerNo: '010000010',
    containerType: 1,
    note100s: 200000,
    notes50: 34000,
    notes20: 2000,
    notes10: 450,
    notes5: 230,
    notes2: 80,
    notes1: 1230,
    coins1: 2132,
    coins05: 145.5,
    coins01: 235.6,

  };
  
  constructor() { }
}
