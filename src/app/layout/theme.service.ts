import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingService } from './setting.service';


export type ThemeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  styleTag: any;

  constructor(private settings: SettingService, @Inject(DOCUMENT) private doc: any) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(settings.layout.theme);
    this.setTheme(settings.layout.theme);
  }

  setTheme(name: ThemeType) {
    const bodyEl = this.doc.querySelector('body');
    console.log(bodyEl);

    const removeArr = [];
    for (let i = 0; i < bodyEl.classList.length; i++) {
      if (bodyEl.classList[i].startsWith('theme-')) {
        removeArr.push(bodyEl.classList[i]);
      }
    }
    bodyEl.classList.remove(...removeArr);
    bodyEl.classList.add(`theme-${name.toLowerCase()}`);
    this.settings.setLayout('theme', name);
  }

  getDefaultTheme() {
    return this.settings.layout.theme;
  }

}






// import { Injectable, Inject } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
// import { SettingsService } from '@delon/theme';
// var ThemesService = /** @class */ (function () {
//   function ThemesService(settings, doc) {
//     this.settings = settings;
//     this.doc = doc;
//     this.setTheme(settings.layout.theme);
//   }
//   ThemesService.prototype.setTheme = function (name) {
//     console.log('我被换肤了')
//     var bodyEl = this.doc.querySelector('body');
//     var removeArr = [];
//     for (var i = 0; i < bodyEl.classList.length; i++) {
//       if (bodyEl.classList[i].startsWith('theme-')) {
//         removeArr.push(bodyEl.classList[i]);
//       }
//     }
//     if(removeArr.length)(_a = bodyEl.classList).remove.apply(_a, removeArr);
//     bodyEl.classList.add("theme-" + name.toLowerCase());
//     this.settings.setLayout('theme', name);
//     var _a;
//   };
//   ThemesService.prototype.getDefaultTheme = function () {
//     return this.settings.layout.theme;
//   };
//   ThemesService.decorators = [
//     { type: Injectable },
//   ];
//   /** @nocollapse */
//   ThemesService.ctorParameters = function () { return [
//     { type: SettingsService, },
//     { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
//   ]; };
//   return ThemesService;
// }());
// export { ThemesService };
//# sourceMappingURL=themes.service.js.map
