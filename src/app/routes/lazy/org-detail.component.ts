import {Component, OnInit} from '@angular/core';
import {LazyService} from './lazy.service';
import {PrepService} from './prep.service';
import {Communicate} from './communicate';

@Component({
    selector: 'org-detail',
    template: `
        <div class="detail">
            <div nz-row>
                <div nz-col [nzSpan]="6" [nzOffset]="4">设备编号</div>
                <div nz-col [nzSpan]="8">{{dev?.devNo}}</div>
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
                <div nz-col [nzSpan]="6" [nzOffset]="4">取款金额(元)</div>
                <div nz-col [nzSpan]="8">{{dev?.cdmAmt}}</div>
            </div>
            <div nz-row>
                <div nz-col [nzSpan]="6" [nzOffset]="4">存款金额(元)</div>
                <div nz-col [nzSpan]="8">{{dev?.cwdAmt}}</div>
            </div>
            <!--<div nz-row>-->
            <!--<div nz-col [nzSpan]="6" [nzOffset]="4">取款金额</div>-->
            <!--<div nz-col [nzSpan]="8">{{dev.cwdAmt}}</div>-->
            <!--</div>-->
            <!--<div nz-row>-->
            <!--<div nz-col [nzSpan]="6" [nzOffset]="4">已服务天数</div>-->
            <!--<div nz-col [nzSpan]="8">{{dev.usingDays}}</div>-->
            <!--</div>-->
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

export class OrgDetailComponent implements OnInit {
    // dev: any = {
    //     devVenderName: null,
    //     devTypeName: null,
    //     cdmCount: null,
    //     cdmAmt: null,
    //     cwdCount: null,
    //     cwdAmt: null,
    //     usingDays: null
    // };
    dev: any;

    constructor(private propService: PrepService,
                private service: LazyService) {
    }

    ngOnInit() {
        this.dev = {
            'devNo': '44023005',
            'cwdAmt': 0,
            'address': '某市青羊区清江东路122号附5-附11号',
            'orgNo': '0440200700',
            'orgName': '某市罗家碾支行附行式自助银行',
            'cdmAmt': 0,
            'retCode': '00', 'retMsg': '查询设备现金收付量成功'
        };

        this.propService.changeDevNo.subscribe((value) => {
            console.log('得到了值' + value);
            const params = {devNo: value};
            this.service.getDevTransInfoById(params).subscribe(_data => {
                console.log(_data);
                this.dev = _data.element;
            });
        });

        // Communicate.getInstance().changeDevNo.subscribe(data => {
        //     const params = {devNo: data};
        //     this.service.getDevTransInfoById(params).subscribe(_data => {
        //         console.log(_data);
        //         this.dev = _data.retList[0];
        //     });
        // });
    }


}

