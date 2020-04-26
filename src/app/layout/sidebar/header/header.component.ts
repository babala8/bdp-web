import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { QuickMenuComponent } from './components/quick-menu/quick-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  constructor(private _modal: NzModalService) {
  }
  openQuickMenu() {
    this._modal.create({
      nzTitle: '管理快捷菜单',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '90%',
      nzContent: QuickMenuComponent,
      nzOnOk: () => {
      },
      nzOnCancel: () => {
      },
    })
  }
}
