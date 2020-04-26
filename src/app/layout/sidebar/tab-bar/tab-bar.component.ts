import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabBarService } from './tab-bar.service';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'tab-bar',
  templateUrl: 'tab-bar.component.html',
  styleUrls: ['tab-bar.component.less'],
})

export class TabBarComponent implements OnInit, AfterViewInit, OnDestroy {
  public tabArray: { id: string, url: string, text: string, active: boolean }[] = this._tabService.tabArray;
  public urlArray: string[] = this._tabService.urlArray;

  constructor(private _metroService: MenuService,
    private _router: Router,
    // private _reuseTabService: AppReuseStrategy,
    private _tabService: TabBarService) {
      this._tabService.tabBar = this;
  }

  /**
   * 监听导航事件，添加新标签
   */
  ngOnInit() {
    this._tabService.initTab();
  }

  ngAfterViewInit() {
    this.addScroll();
  }

  handleMenu(event) {
    event.preventDefault();
  }

  /**
   * 各子应用状态由子应用自己保有，故对于主应用来说标签页跳转只是进行简单导航操作
   * @param item
   */
  navigateUrl(item) {
    this._tabService.navigateUrl(item);

  }

  /**
   * 根据标签栏id删除当前标签栏，同时如果删除标签栏为子应用标签，还需通知子应用卸载该标签
   * @param id
   */
  deleteItem(id) {
    this._tabService.deleteItem(id);
  }

  /**
   * 清空所有标签栏但是保留最新活动栏
   */
  clearTab() {
    this._tabService.clearTab();
    this.tabArray = this._tabService.tabArray;
  }

  addScroll() {
    const boxContainer = $('.tab_container'),
      box = $('.tab_text');

    boxContainer.on('mousedown', function (e) {
      // 鼠标点击时候的位置
      const posX = e.screenX;
      const currentScroll = box.scrollLeft(); // 当前的scrollLeft值

      $(document).on('mousemove', function (event) {
        const posL = event.clientX, // 滚动后鼠标的位置
          moveX = posL - posX;      // 鼠标拖动距离
        box.scrollLeft(currentScroll - moveX)
      });

      // 清空事件
      $(document).on('mouseup', function () {
        $(this).unbind();
      });

    });

  }

  scrollToRight() {
    setTimeout(() => {
      const box = $('.tab_text'),
        scrollWidth = box.prop("scrollWidth");
      box.scrollLeft(scrollWidth - box.width());
    }, 0);
  }

  ngOnDestroy(): void {

  }
}
