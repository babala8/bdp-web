import { Inject, Injectable } from '@angular/core';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { NzIconService } from 'ng-zorro-antd';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../i18n/i18n.service';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    // private session: SessionService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve) => {
      resolve(null);
    });
  }
}
