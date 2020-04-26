import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VERSION as VERSION_ALAIN } from '@delon/theme';
import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';
import { ReuseTabService } from '@delon/abc';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private modalSrv: NzModalService,
    private resuseTab: ReuseTabService
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'ng-alain-version',
      VERSION_ALAIN.full,
    );
    renderer.setAttribute(
      el.nativeElement,
      'ng-zorro-version',
      VERSION_ZORRO.full,
    );
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        // this.titleSrv.setTitle('紫金智慧金库运营管理系统');
        this.modalSrv.closeAll();
        // this._appService.closeOpenModalAll();
        console.log(this.resuseTab.items);
      });
  }
}
