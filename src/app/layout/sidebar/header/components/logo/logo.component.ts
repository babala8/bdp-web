import {Component} from '@angular/core';

@Component({
    selector: 'header-logo',
    template: `
        <a routerLink="/app/app2/home">
            <span style="padding: 0 16px;" class="zijin-micon-bank-of-shanghai"></span>
        </a>
    `,
    styleUrls: ['./logo.component.less']
})
export class HeaderLogoComponent {

    constructor() {
    }

}
