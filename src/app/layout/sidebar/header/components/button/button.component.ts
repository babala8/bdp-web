import {Component} from '@angular/core';
import {SessionService} from '@core/session.service';
import { TabBarService } from '../../../tab-bar/tab-bar.service';

@Component({
    selector: 'header-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less']
})
export class HeaderButtonComponent {
    constructor(
        private sessionService: SessionService,
        private _tabBarService: TabBarService
    ) {
        // this.toggle();
    }

    toggle() {
        // $('app-layout').toggleClass('aside-expanded');
    }

    logout() {
        this.sessionService.logout();
        this._tabBarService.destroy();
    }
}
