import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShufflingDataService } from '../lazy/shufflingData.service';

/**
 * zj-screen组件使用方式
 *
 * splitDisabled - 是否显示布局分割符。为false时，页面会出现保存按钮，可以下载当前页面布局信息
 * backgroundImage -  指定背景图片
 * headImg  - 指定头部背景图片
 *
 */

@Component({
  // language=HTML
  template: `
    <zj-screen [splitDisabled]="true"
               [backgroundImage]="'./assets/images/screen/bj-yz.png'"
               [headImg]="'./assets/images/screen/screen_header1.png'"
               (closeScreen)="toOtherPage()">
    </zj-screen>
  `,
  styles: [
      `
      :host {
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
        padding: 0;
      }

      :host /deep/ div.screen-container {
        padding-top: 0px !important;
        margin-top: -9px !important;
      }

      :host /deep/ as-split-area {
        position: relative;
        overflow-y: hidden !important;
      }

      :host /deep/ div.card {
        width: 100%;
        height: 100%;
        position: absolute;
        /*,清除delon库中,边框样式*/
        background: none;
        overflow: visible !important;
      }

      :host /deep/ div.screen-container {
        margin-top: 0px;
      }

      :host /deep/ div.as-split-gutter {
        background-color: transparent !important;
      }

      /*左上边框*/
      :host /deep/ div.screen-container > as-split > as-split-area:first-child > as-split > as-split-area:first-child > div.card {
        border: 5px solid transparent;
        border-image: url("./assets/images/screen/left1-bj-dp.png") 5 5 repeat stretch;
      }

      /*左中边框*/
      :host /deep/ div.screen-container > as-split > as-split-area:first-child > as-split > as-split-area:nth-child(2) > div.card {
        border: 5px solid transparent;
        border-image: url("./assets/images/screen/left2-bj-dp.png") 5 5 repeat stretch;
      }

      /*左下边框*/
      :host /deep/ div.screen-container > as-split > as-split-area:first-child > as-split > as-split-area:nth-child(3) > div.card {
        border: 5px solid transparent;
        border-image: url("./assets/images/screen/left3-bj-dp.png") 5 5 repeat stretch;
      }

      /*右上边框*/
      :host /deep/ div.screen-container > as-split > as-split-area:nth-child(3) > as-split > as-split-area:nth-child(1) > div.card {
        border: 5px solid transparent;
        border-image: url("./assets/images/screen/right1-bj-dp.png") 5 5 repeat stretch;
      }

      /*右下边框*/
      :host /deep/ div.screen-container > as-split > as-split-area:nth-child(3) > as-split > as-split-area:nth-child(2) > div.card {
        border: 5px solid transparent;
        border-image: url("./assets/images/screen/right2-bj-dp.png") 5 5 repeat stretch;
      }

      /*中间边框*/
      :host /deep/ div.screen-container > as-split > as-split-area:nth-child(2) {
        border: 5px solid transparent;
        border-image: url("./assets/images/screen/middle-bj-dp.png") 5 5 fill repeat stretch;
      }
    `,
  ],
})
export class ScreenComponent implements OnInit, OnDestroy {

  constructor(private service: ShufflingDataService) {
  }

  ngOnInit() {
    console.log('初始化screen');

    // 进入大屏时，调用轮播的几个组件所需接口，把返回值放在ShufflingDataService服务中
    // 其组件需数据源，直接从ShufflingDataService服务取
    this.service.getTransTypeByUpperOrgNo();
  }

  ngOnDestroy() {
    console.log('销毁screen');

    // 销毁大屏组件是，清空ShufflingDataService服务中，所有轮播组件数据源
    this.service.clean();
  }

  toOtherPage() {
    // const tabArray = JSON.parse(localStorage.getItem('tabItemArray'));
    // console.log(tabArray);
    // const url = tabArray.find(item => item.active).url || '/home';
    // console.log('screenUrl',url);
    history.go(-1);
  }

}

