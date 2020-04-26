import { Component } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { IMaster } from '@zijin/messi';
import { ThemeService } from '../../../../theme.service';
import { SettingService } from '../../../../setting.service';

@Component({
  selector: 'header-theme',
  template: `
    <strong>切换主题</strong>
    <div class="theme-icons">
      <label *ngFor="let item of themes" (click)="changeTheme(item.l)" [style.background]="item.bg">
        <i class="anticon anticon-check" *ngIf="item.l == settings.layout.theme"></i>
        <div class="areas">
          <span class="nav" [style.background]="item.nav"></span>
          <span class="con" [style.background]="item.con"></span>
        </div>
      </label>
    </div>
  `,
  styleUrls: ['./theme.component.less'],
})
export class HeaderThemeComponent {

  themes: { l: any, bg: string, nav: string, con: string }[] = [
    { l: 'A', bg: '#108ee9', nav: '#108ee9', con: '#f5f7fa' },
    { l: 'B', bg: '#00a2ae', nav: '#00a2ae', con: '#f5f7fa' },
    { l: 'C', bg: '#00a854', nav: '#00a854', con: '#f5f7fa' },
    { l: 'I', bg: '#c50819', nav: '#c50819', con: '#f5f7fa' },
  ];

  private messiMaster: IMaster;
  private appNameList = this.appService.appNameList;


  constructor(
    public settings: SettingService,
    private appService: AppService,
    private themeSrv: ThemeService
  ) {
    this.appService.messiMaster.then(res => {
      this.messiMaster = res;
    });
  }

  changeTheme(theme) {
    this.themeSrv.setTheme(theme);
    this.settings.setLayout('theme', theme);
    this.appNameList.forEach(va => {
      this.messiMaster.triggerEventInApp(va, 'changeTheme', theme);
    });
  }
}
