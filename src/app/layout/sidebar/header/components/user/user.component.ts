import { Router } from '@angular/router';
import {Component} from '@angular/core';
import {SessionService} from '@core/session.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PasswordComponent } from "../password/password.component";

@Component({
    selector: 'header-user-info',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less']
})
export class HeaderUserInfoComponent {
    userInfo;

    constructor(private sessionService: SessionService,
                public msgSrv: NzMessageService,
                public router: Router,
                private _modal: NzModalService) {
        this.userInfo = this.sessionService.userInfo;
    }

    modPsd() {
        // this.router.navigate(['/psd-mod']);
      this._modal.create({
        nzTitle: '修改密码',
        nzMaskClosable: false,
        nzFooter: null,
        nzWidth: '60%',
        nzContent: PasswordComponent,
        nzOnOk: () => {
        },
        nzOnCancel: () => {
        },
      })
    }

    logout() {
        this.sessionService.logout();
    }

    openScreen() {
      this.router.navigateByUrl('/screen');
    }
}
