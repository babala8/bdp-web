import {Component, EventEmitter, Inject, Injector, Input, OnInit, Optional, Output} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from './components/card-alternatives.component';
import * as _ from 'lodash';
import {DASHBOARDSERVICE} from './config';
import {zip} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'zj-single-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.less']
})
export class DashboardComponent implements OnInit {

  data: any;   // dynamic created

  @Input() pageId;
  @Input() dashboardService;

  @Output() onSuccess = new EventEmitter();

  echartsTheme;

  name;
  description;

  openSetting = false;
  setting = false;
  cards;
  tabs;
  alternatives;

  // 当前驾驶舱配置项
  currentSettings: any;

  pendingTabs = [];

  constructor(private modal: NzModalService,
              @Inject(DASHBOARDSERVICE) @Optional() dashboardService,
              private injector: Injector,
              private _message: NzMessageService) {
    if (dashboardService) {
      this.dashboardService = dashboardService;
    }
  }

  cardModal(card) {
    this.modal.create({
      nzClosable: true,
      nzOkType: '请选择图表',
      nzWidth: 700,
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: CardAlternativesComponent,
      nzComponentParams: {
        card,
        cards: this.cards,
        alts: this.alternatives
      }
    }).afterClose.subscribe(value => {
      if (value.id) {
        this.cards[this.cards.indexOf(card)] = value;
      }
    }, () => {
    });
  }

  deleteCard(i) {
    this.cards[i] = {};
  }

  openPanel(i, r) {
    this.tabs[r][i] = {
      name: '请选择...',
      pending: true
    };
  }

  swap(i, r) {
    let index = -1;
    this.pendingTabs.forEach((val, idx) => {
      if (val.index[0] === i && val.index[1] === r) {
        this.tabs[r][i] = val.tab;
        index = idx;
      }
    });
    if (index !== -1) {
      this.pendingTabs.splice(index, 1);
    }
  }

  deleteTab(i, r) {
    let index = -1;
    this.pendingTabs.forEach((val, idx) => {
      if (val.index[0] === i && val.index[1] === r) {
        index = idx;
      }
    });
    if (index !== -1) {
      this.pendingTabs.splice(index, 1);
    }

    this.tabs[r].splice(i, 1);
  }

  addTab(r) {
    this.tabs[r].push(
      {
        name: '请选择...',
        pending: true
      }
    );
    // 需要调用nz-tabset的组件方法来激活新增的选项
  }

  selectTab(evt) {
    _.forEachRight(this.pendingTabs, (val, idx) => {
      if (val.index[0] === evt.index[0] && val.index[1] === evt.index[1]) {
        this.pendingTabs.splice(idx, 1);
      }
    });
    this.pendingTabs.push({
      tab: evt.tab,
      index: evt.index
    });
  }

  openSettings() {
    this.openSetting = true;
    this.currentSettings = {
      cards: [].concat(this.cards),
      tabs: [Array.prototype.concat(this.tabs[0]), Array.prototype.concat(this.tabs[1])]
    };
    setTimeout(() => {
      this.setting = true;
      this.openSetting = false;
    }, 500);
  }

  /**
   * 1.过滤pending为true的tab
   * 2.保存设置到服务端
   */
  saveSetting() {
    this.openSetting = true;

    for (let l = this.tabs[0].length - 1; l >= 0; l--) {
      if (this.tabs[0][l].pending === true) {
        this.tabs[0].splice(l, 1);
      }
    }
    for (let l = this.tabs[1].length - 1; l >= 0; l--) {
      if (this.tabs[1][l].pending === true) {
        this.tabs[1].splice(l, 1);
      }
    }

    const homeDef = {
      cards: [],
      tabs: [[], []]
    };

    this.cards.forEach(val => {
      homeDef.cards.push({id: val.id});
    });

    this.tabs.forEach((tabSet, index) => {
      tabSet.forEach(val => {
        homeDef.tabs[index].push({id: val.id, name: val.name});
      });
    });

    if (this.dashboardService.updatePageDefById) {
      this.dashboardService.updatePageDefById({
        pageId: this.pageId, homeDef
      }).subscribe(() => {
        this.setting = false;
        this.openSetting = false;
        this._message.success('驾驶舱配置成功！');
        this.onSuccess.emit('驾驶舱配置成功');
      }, err => {
        this.openSetting = false;
        this._message.error(err.body.retMsg);
      });
    } else {
      this._message.error('您所传递驾驶舱配置服务有误，\n 请确定其保存的服务名为"updatePageDefById"');
    }
  }

  ngOnInit(): void {
    console.log(this.tabs);

    this.pageId = this.pageId || this.data.pageId;
    this.echartsTheme = this.data ? this.data.theme : 'vintage';

    if (!this.pageId) {
      this._message.error('获取主页id失败！');
      return;
    }

    if (this.dashboardService.getPageDefById && this.dashboardService.getChartsDef) {
      this.openSetting = true;
      // todo:没有办法预测这个请求将要执行多长时间,可以用NgZone来提供钩子吗？
      zip(
        this.dashboardService.getPageDefById(this.pageId),
        this.dashboardService.getChartsDef()
      ).pipe(
        // 接收其他拦截器后产生的异常消息
        catchError(([homeConf, cardsDef]) => {
          return [homeConf, cardsDef];
        })
      ).subscribe(([homeConf, cardsDef]) => {

        this.openSetting = false;

        this.cards = homeConf.homeDef.cards;
        this.tabs = homeConf.homeDef.tabs;
        this.name = homeConf.themeName;
        this.description = homeConf.themeDesc;

        this.alternatives = cardsDef.filter((value) => {
          return value.type === '0';
        });
      });
    } else {
      this._message.error('您所传递驾驶舱配置服务有误,当前操作是获取当前主页配置与获取可选择内容');
    }

  }

  cancel() {
    this.cards = this.currentSettings.cards;
    this.tabs = this.currentSettings.tabs;
    this.setting = false;
    this.openSetting = false;
  }

  trackByFn(index) {
    return index;
  }


}

