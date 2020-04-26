import {Component, OnInit} from '@angular/core';
import {LazyService} from './lazy.service';
import {SessionService} from '../../core/session.service';
import {PrepService} from './prep.service';
import {Communicate} from './communicate';

@Component({
    selector: 'dev-detail',
    template: `
        <div class="detail">
            <div nz-row>
                <div nz-col [nzSpan]="6" [nzOffset]="4">设备编号</div>
                <div nz-col [nzSpan]="8">{{dev?.orgNo}}</div>
            </div>
            <div nz-row>
                <div nz-col [nzSpan]="6" [nzOffset]="4">机构名称</div>
                <div nz-col [nzSpan]="8">{{dev?.orgName}}</div>
            </div>
            <div nz-row>
                <div nz-col [nzSpan]="6" [nzOffset]="4">机构地址</div>
                <div nz-col [nzSpan]="8">{{dev?.address}}</div>
            </div>
            <div nz-row>
                <div nz-col [nzSpan]="6" [nzOffset]="4">加钞总量(元)</div>
                <div nz-col [nzSpan]="8">{{dev?.addAmt}}</div>
            </div>
            <div nz-row>
                <div nz-col [nzSpan]="6" [nzOffset]="4">卸钞总量(元)</div>
                <div nz-col [nzSpan]="8">{{dev?.leftAmt}}</div>
            </div>
        </div>
    `,
    // language=CSS
    styles: [`
        .detail {
            color: #23F1CE;
            margin-top: 20px;
            text-align: center;
            font-size: 16px;
        }

        .detail div[nz-row] {
            padding: 5px 0;
        }
    `]
})

export class DevDetailComponent implements OnInit {
    dev = {
        orgNo: null,
        orgName: null,
        address: null,
        addAmt: null,
        leftAmt: null
    };

    constructor(private propService: PrepService,
                private service: LazyService) {
    }

    ngOnInit() {
        this.dev = {
            // 'devNo': '44022857',
            'address': '四川省简阳市河东雄州新城3号花园天津路与金融街交界处',
            'addAmt': 13600000,
            'orgNo': '44022857',
            'orgName': '某简阳天津路支行附行式自助银行',
            'leftAmt': 2320600,
        };

        // this.propService.changeOrgNo.subscribe((value) => {
        //     console.log('得到了值' + value);
        //     const params = {devNo: value};
        //     this.service.getAddCashAmtByDevNo(params).subscribe(_data => {
        //         console.log(_data);
        //         this.dev = _data.element[0];
        //     });
        // });
        // Communicate.getInstance().changeOrgNo.subscribe(data => {
        //     const params = {devNo: data};
        //     this.service.getAddCashAmtByDevNo(params).subscribe(_data => {
        //         console.log(_data);
        //         this.dev = _data.element[0];
        //     });
        // });
    }


}

