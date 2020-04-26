import { Component, OnInit } from '@angular/core';
import { TransactionTypeAnalysisComponent } from './transaction-type-analysis.component';
import { TransactionDistAnalysisComponent } from './transaction-dist-analysis.component';

/**
 * zj-carousel组件使用方式
 *
 * panels - 要渲染的组件
 * zjArrows - 是否显示两边的箭头
 * zjAutoPlay   - 是否自动切换内容
 * zjAutoPlaySpeed  - 自动切换内容的时间间隔
 *
 */

@Component({
  selector: 'app-demo-carousel',
  template: `
    <zj-carousel [panels]="panels" [zjArrows]="true" [zjAutoPlay]="true" [zjAutoPlaySpeed]="10000"></zj-carousel>
  `,
  styles: [`
    :host {
      height: 100%;
      width: 1005;
      margin: 0 auto;
      background-color: #4d4d4c;
    }
  `],
})
export class DemoCarouselComponent implements OnInit {
  panels = [
    {
      component: TransactionDistAnalysisComponent,
      data: '',
    },
    {
      component: TransactionTypeAnalysisComponent,
      data: '',
    },

  ];

  constructor() {

  }

  ngOnInit(): void {
  }
}
