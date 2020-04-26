import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { LayoutSidebarComponent } from '../../../layout.sidebar.component';
import { MenuService, Menu } from '../../../../menu.service';
import { MenuChange } from '../../../menu.change';

@Component({
  selector: 'header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class HeaderMenuComponent implements AfterViewInit {

  $element: JQuery;
  $scrollWrapper: JQuery;
  menuArray: Array<Menu> = [];
  menuChange = MenuChange.getInstance();

  constructor(private _elementRef: ElementRef,
              private _menuService: MenuService,
              private _layout: LayoutSidebarComponent) {
    this._menuService.change.subscribe(menus => {
      console.log('menus', menus);
      if (menus && menus.length > 1) {
        this.menuArray = menus[1].children;
        this.menuArray.forEach(item => {
          console.log(item._selected);
        });
        console.log(this.menuArray);
      }
    });
    this.$element = $(this._elementRef.nativeElement);

  }

  doShow(index) {
    const $slideBox = $('.slide-block');
    this.menuArray.forEach((menu, i) => {
        menu._selected = index === i;
        $slideBox.transitionOnce({
          'transform': `translateX(${$('header-menu ul>li').eq(index).position().left}px)`,
        });
    });
    this.menuChange.setMenu(this.menuArray[index]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.$scrollWrapper = this.$element.find('.scroll-wrapper');
      this.addMouseWheel();
    }, 0);
  }

  get leftHidden() {
    if (this.$scrollWrapper) {
      return this.$scrollWrapper.scrollLeft() > 10;
    }
    return false;
  }

  get rightHidden() {
    if (this.$scrollWrapper) {
      const innerWidth = this.$element.find('ul').width();
      return this.$scrollWrapper.scrollLeft() + this.$scrollWrapper.width() + 10 < innerWidth;
    }
    return false;
  }

  addMouseWheel() {
    const $scrollWrapper = this.$scrollWrapper;
    $scrollWrapper.mousewheel((event, delta, deltaX, deltaY) => {
      $scrollWrapper.scrollLeft($scrollWrapper.scrollLeft() - delta * 20);
      return false;
    });
  }
  toLeft(){
    const $scrollWrapper = this.$scrollWrapper;
    $scrollWrapper.scrollLeft($scrollWrapper.scrollLeft() - 60)
  }

  toRight() {
    const $scrollWrapper = this.$scrollWrapper;
    $scrollWrapper.scrollLeft($scrollWrapper.scrollLeft() + 60);
  }

}
