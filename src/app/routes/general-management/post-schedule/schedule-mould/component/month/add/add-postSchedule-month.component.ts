import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import { HttpResponse } from '@angular/common/http';
import {PostScheduleService} from "../../../../post-schedule.service";

@Component({
  selector: 'app-add-postSchedule-month',
  templateUrl: './add-postSchedule-month.component.html',
  styles: [`
        form>div {
            padding: 8px 0;
        }
    `]
})
export class AddPostScheduleMonthComponent implements OnInit {
  validateForm;
  loading = false;
  formModel = {};

  constructor(private fb: FormBuilder,
              private nzModal: NzModalRef,
              private message: NzMessageService,
              private sessionService:SessionService,
              private service: PostScheduleService
  ) {
  }

  data;
  userList11;userList12;userList13;userList14;userList15;userList16;userList17;userList18;userList19;userList110;userList111;userList112;userList113;userList114;
  userList115;userList116;userList117;userList118;userList119;userList120;userList121;userList122;userList123;userList124;userList125;userList126;userList127;userList128;
  userList129;userList130;userList131;

  userList21;userList22;userList23;userList24;userList25;userList26;userList27;userList28;userList29;userList210;userList211;userList212;userList213;userList214;
  userList215;userList216;userList217;userList218;userList219;userList220;userList221;userList222;userList223;userList224;userList225;userList226;userList227;userList228;
  userList229;userList230;userList231;

  userList31;userList32;userList33;userList34;userList35;userList36;userList37;userList38;userList39;userList310;userList311;userList312;userList313;userList314;
  userList315;userList316;userList317;userList318;userList319;userList320;userList321;userList322;userList323;userList324;userList325;userList326;userList327;userList328;
  userList329;userList330;userList331;

  ngOnInit() {
    const params = {
      orgNo: this.data.orgNo,
      postNo: this.data.postNo
    };
    this.loading = true;
    this.service.getUserInfo(params)
        .subscribe(_data => {
            this.loading = false;
            this.userList11 = _data['retList'];
            this.formModel['userList11'] = this.userList11.map(item =>item.userName);
            this.userList12 = _data['retList'];
            this.formModel['userList12'] = this.userList12.map(item =>item.userName);
            this.userList13 = _data['retList'];
            this.formModel['userList13'] = this.userList13.map(item =>item.userName);
            this.userList14 = _data['retList'];
            this.formModel['userList14'] = this.userList14.map(item =>item.userName);
            this.userList15 = _data['retList'];
            this.formModel['userList15'] = this.userList15.map(item =>item.userName);
            this.userList16 = _data['retList'];
            this.formModel['userList16'] = this.userList16.map(item =>item.userName);
            this.userList17 = _data['retList'];
            this.formModel['userList17'] = this.userList17.map(item =>item.userName);
            this.userList18 = _data['retList'];
            this.formModel['userList18'] = this.userList18.map(item =>item.userName);
            this.userList19 = _data['retList'];
            this.formModel['userList19'] = this.userList19.map(item =>item.userName);
            this.userList110 = _data['retList'];
            this.formModel['userList110'] = this.userList110.map(item =>item.userName);
            this.userList111 = _data['retList'];
            this.formModel['userList111'] = this.userList111.map(item =>item.userName);
            this.userList112 = _data['retList'];
            this.formModel['userList112'] = this.userList112.map(item =>item.userName);
            this.userList113 = _data['retList'];
            this.formModel['userList113'] = this.userList113.map(item =>item.userName);
            this.userList114 = _data['retList'];
            this.formModel['userList114'] = this.userList114.map(item =>item.userName);
            this.userList115 = _data['retList'];
            this.formModel['userList115'] = this.userList115.map(item =>item.userName);
            this.userList116 = _data['retList'];
            this.formModel['userList116'] = this.userList116.map(item =>item.userName);
            this.userList117 = _data['retList'];
            this.formModel['userList117'] = this.userList117.map(item =>item.userName);
            this.userList118 = _data['retList'];
            this.formModel['userList118'] = this.userList118.map(item =>item.userName);
            this.userList119 = _data['retList'];
            this.formModel['userList119'] = this.userList119.map(item =>item.userName);
            this.userList120 = _data['retList'];
            this.formModel['userList120'] = this.userList120.map(item =>item.userName);
            this.userList121 = _data['retList'];
            this.formModel['userList121'] = this.userList121.map(item =>item.userName);
            this.userList122 = _data['retList'];
            this.formModel['userList122'] = this.userList122.map(item =>item.userName);
            this.userList123 = _data['retList'];
            this.formModel['userList123'] = this.userList123.map(item =>item.userName);
            this.userList124 = _data['retList'];
            this.formModel['userList124'] = this.userList124.map(item =>item.userName);
            this.userList125 = _data['retList'];
            this.formModel['userList125'] = this.userList125.map(item =>item.userName);
            this.userList126 = _data['retList'];
            this.formModel['userList126'] = this.userList126.map(item =>item.userName);
            this.userList127 = _data['retList'];
            this.formModel['userList127'] = this.userList127.map(item =>item.userName);
            this.userList128 = _data['retList'];
            this.formModel['userList128'] = this.userList128.map(item =>item.userName);
            this.userList129 = _data['retList'];
            this.formModel['userList129'] = this.userList129.map(item =>item.userName);
            this.userList130 = _data['retList'];
            this.formModel['userList130'] = this.userList130.map(item =>item.userName);
            this.userList131 = _data['retList'];
            this.formModel['userList131'] = this.userList131.map(item =>item.userName);

            this.userList21 = _data['retList'];
            this.formModel['userList21'] = this.userList21.map(item =>item.userName);
            this.userList22 = _data['retList'];
            this.formModel['userList22'] = this.userList22.map(item =>item.userName);
            this.userList23 = _data['retList'];
            this.formModel['userList23'] = this.userList23.map(item =>item.userName);
            this.userList24 = _data['retList'];
            this.formModel['userList24'] = this.userList24.map(item =>item.userName);
            this.userList25 = _data['retList'];
            this.formModel['userList25'] = this.userList25.map(item =>item.userName);
            this.userList26 = _data['retList'];
            this.formModel['userList26'] = this.userList26.map(item =>item.userName);
            this.userList27 = _data['retList'];
            this.formModel['userList27'] = this.userList27.map(item =>item.userName);
            this.userList28 = _data['retList'];
            this.formModel['userList28'] = this.userList28.map(item =>item.userName);
            this.userList29 = _data['retList'];
            this.formModel['userList29'] = this.userList29.map(item =>item.userName);
            this.userList210 = _data['retList'];
            this.formModel['userList210'] = this.userList210.map(item =>item.userName);
            this.userList211 = _data['retList'];
            this.formModel['userList211'] = this.userList211.map(item =>item.userName);
            this.userList212 = _data['retList'];
            this.formModel['userList212'] = this.userList212.map(item =>item.userName);
            this.userList213 = _data['retList'];
            this.formModel['userList213'] = this.userList213.map(item =>item.userName);
            this.userList214 = _data['retList'];
            this.formModel['userList214'] = this.userList214.map(item =>item.userName);
            this.userList215 = _data['retList'];
            this.formModel['userList215'] = this.userList215.map(item =>item.userName);
            this.userList216 = _data['retList'];
            this.formModel['userList216'] = this.userList216.map(item =>item.userName);
            this.userList217 = _data['retList'];
            this.formModel['userList217'] = this.userList217.map(item =>item.userName);
            this.userList218 = _data['retList'];
            this.formModel['userList218'] = this.userList218.map(item =>item.userName);
            this.userList219 = _data['retList'];
            this.formModel['userList219'] = this.userList219.map(item =>item.userName);
            this.userList220 = _data['retList'];
            this.formModel['userList220'] = this.userList220.map(item =>item.userName);
            this.userList221 = _data['retList'];
            this.formModel['userList221'] = this.userList221.map(item =>item.userName);
            this.userList222 = _data['retList'];
            this.formModel['userList222'] = this.userList222.map(item =>item.userName);
            this.userList223 = _data['retList'];
            this.formModel['userList223'] = this.userList223.map(item =>item.userName);
            this.userList224 = _data['retList'];
            this.formModel['userList224'] = this.userList224.map(item =>item.userName);
            this.userList225 = _data['retList'];
            this.formModel['userList225'] = this.userList225.map(item =>item.userName);
            this.userList226 = _data['retList'];
            this.formModel['userList226'] = this.userList226.map(item =>item.userName);
            this.userList227 = _data['retList'];
            this.formModel['userList227'] = this.userList227.map(item =>item.userName);
            this.userList228 = _data['retList'];
            this.formModel['userList228'] = this.userList228.map(item =>item.userName);
            this.userList229 = _data['retList'];
            this.formModel['userList229'] = this.userList229.map(item =>item.userName);
            this.userList230 = _data['retList'];
            this.formModel['userList230'] = this.userList230.map(item =>item.userName);
            this.userList231 = _data['retList'];
            this.formModel['userList231'] = this.userList231.map(item =>item.userName);

            this.userList31 = _data['retList'];
            // this.formModel['userList31'] = this.userList31.map(item =>item.userName);
            this.userList32 = _data['retList'];
            // this.formModel['userList32'] = this.userList32.map(item =>item.userName);
            this.userList33 = _data['retList'];
            // this.formModel['userList33'] = this.userList33.map(item =>item.userName);
            this.userList34 = _data['retList'];
            // this.formModel['userList34'] = this.userList34.map(item =>item.userName);
            this.userList35 = _data['retList'];
            // this.formModel['userList35'] = this.userList35.map(item =>item.userName);
            this.userList36 = _data['retList'];
            // this.formModel['userList36'] = this.userList36.map(item =>item.userName);
            this.userList37 = _data['retList'];
            // this.formModel['userList37'] = this.userList37.map(item =>item.userName);
            this.userList38 = _data['retList'];
            // this.formModel['userList38'] = this.userList38.map(item =>item.userName);
            this.userList39 = _data['retList'];
            // this.formModel['userList39'] = this.userList39.map(item =>item.userName);
            this.userList310 = _data['retList'];
            // this.formModel['userList310'] = this.userList310.map(item =>item.userName);
            this.userList311 = _data['retList'];
            // this.formModel['userList311'] = this.userList311.map(item =>item.userName);
            this.userList312 = _data['retList'];
            // this.formModel['userList312'] = this.userList312.map(item =>item.userName);
            this.userList313 = _data['retList'];
            // this.formModel['userList313'] = this.userList313.map(item =>item.userName);
            this.userList314 = _data['retList'];
            // this.formModel['userList314'] = this.userList314.map(item =>item.userName);
            this.userList315 = _data['retList'];
            // this.formModel['userList315'] = this.userList315.map(item =>item.userName);
            this.userList316 = _data['retList'];
            // this.formModel['userList316'] = this.userList316.map(item =>item.userName);
            this.userList317 = _data['retList'];
            // this.formModel['userList317'] = this.userList317.map(item =>item.userName);
            this.userList318 = _data['retList'];
            // this.formModel['userList318'] = this.userList318.map(item =>item.userName);
            this.userList319 = _data['retList'];
            // this.formModel['userList319'] = this.userList319.map(item =>item.userName);
            this.userList320 = _data['retList'];
            // this.formModel['userList320'] = this.userList320.map(item =>item.userName);
            this.userList321 = _data['retList'];
            // this.formModel['userList321'] = this.userList321.map(item =>item.userName);
            this.userList322 = _data['retList'];
            // this.formModel['userList322'] = this.userList322.map(item =>item.userName);
            this.userList323 = _data['retList'];
            // this.formModel['userList323'] = this.userList323.map(item =>item.userName);
            this.userList324 = _data['retList'];
            // this.formModel['userList324'] = this.userList324.map(item =>item.userName);
            this.userList325 = _data['retList'];
            // this.formModel['userList325'] = this.userList325.map(item =>item.userName);
            this.userList326 = _data['retList'];
            // this.formModel['userList326'] = this.userList326.map(item =>item.userName);
            this.userList327 = _data['retList'];
            // this.formModel['userList327'] = this.userList327.map(item =>item.userName);
            this.userList328 = _data['retList'];
            // this.formModel['userList328'] = this.userList328.map(item =>item.userName);
            this.userList329 = _data['retList'];
            // this.formModel['userList329'] = this.userList329.map(item =>item.userName);
            this.userList330 = _data['retList'];
            // this.formModel['userList330'] = this.userList330.map(item =>item.userName);
            this.userList331 = _data['retList'];
            // this.formModel['userList331'] = this.userList331.map(item =>item.userName);

        }, (error) => {
          this.loading = false;
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });
  }

  openSure() {
    const params: any = {};
    params['mouldName'] = this.data.mouldName;
    params['orgNo'] = this.data.orgNo;
    params['mouldType'] = this.data.mouldType;
    params['postNo'] = this.data.postNo;

    let opList11 = [];
    if(this.formModel['userList11'] != null) {
      this.formModel['userList11'].forEach(element => {
        let op = {"opNo" : element};
        opList11.push(op);
      });
    }

    let opList21 = [];
    if(this.formModel['userList21'] != null) {
      this.formModel['userList21'].forEach(element => {
        let op = {"opNo" : element};
        opList21.push(op);
      });
    }

    let opList31 = [];
    if(this.formModel['userList31'] != null) {
      this.formModel['userList31'].forEach(element => {
        let op = {"opNo" : element};
        opList31.push(op);
      });
    }

    let opList12 = [];
    if(this.formModel['userList12'] != null) {
      this.formModel['userList12'].forEach(element => {
        let op = {"opNo" : element};
        opList12.push(op);
      });
    }

    let opList22 = [];
    if(this.formModel['userList22'] != null) {
      this.formModel['userList22'].forEach(element => {
        let op = {"opNo" : element};
        opList22.push(op);
      });
    }

    let opList32 = [];
    if(this.formModel['userList32'] != null) {
      this.formModel['userList32'].forEach(element => {
        let op = {"opNo" : element};
        opList32.push(op);
      });
    }

    let opList13 = [];
    if(this.formModel['userList13'] != null) {
      this.formModel['userList13'].forEach(element => {
        let op = {"opNo" : element};
        opList13.push(op);
      });
    }

    let opList23 = [];
    if(this.formModel['userList23'] != null) {
      this.formModel['userList23'].forEach(element => {
        let op = {"opNo" : element};
        opList23.push(op);
      });
    }

    let opList33 = [];
    if(this.formModel['userList33'] != null) {
      this.formModel['userList33'].forEach(element => {
        let op = {"opNo" : element};
        opList33.push(op);
      });
    }

    let opList14 = [];
    if(this.formModel['userList14'] != null) {
      this.formModel['userList14'].forEach(element => {
        let op = {"opNo" : element};
        opList14.push(op);
      });
    }

    let opList24 = [];
    if(this.formModel['userList24'] != null) {
      this.formModel['userList24'].forEach(element => {
        let op = {"opNo" : element};
        opList24.push(op);
      });
    }

    let opList34 = [];
    if(this.formModel['userList34'] != null) {
      this.formModel['userList34'].forEach(element => {
        let op = {"opNo" : element};
        opList34.push(op);
      });
    }

    let opList15 = [];
    if(this.formModel['userList15'] != null) {
      this.formModel['userList15'].forEach(element => {
        let op = {"opNo" : element};
        opList15.push(op);
      });
    }

    let opList25 = [];
    if(this.formModel['userList25'] != null) {
      this.formModel['userList25'].forEach(element => {
        let op = {"opNo" : element};
        opList25.push(op);
      });
    }

    let opList35 = [];
    if(this.formModel['userList35'] != null) {
      this.formModel['userList35'].forEach(element => {
        let op = {"opNo" : element};
        opList35.push(op);
      });
    }

    let opList16 = [];
    if(this.formModel['userList16'] != null) {
      this.formModel['userList16'].forEach(element => {
        let op = {"opNo" : element};
        opList16.push(op);
      });
    }

    let opList26 = [];
    if(this.formModel['userList26'] != null) {
      this.formModel['userList26'].forEach(element => {
        let op = {"opNo" : element};
        opList26.push(op);
      });
    }


    let opList36 = [];
    if(this.formModel['userList36'] != null) {
      this.formModel['userList36'].forEach(element => {
        let op = {"opNo" : element};
        opList36.push(op);
      });
    }

    let opList17 = [];
    if(this.formModel['userList17'] != null) {
      this.formModel['userList17'].forEach(element => {
        let op = {"opNo" : element};
        opList17.push(op);
      });
    }

    let opList27 = [];
    if(this.formModel['userList27'] != null) {
      this.formModel['userList27'].forEach(element => {
        let op = {"opNo" : element};
        opList27.push(op);
      });
    }

    let opList37 = [];
    if(this.formModel['userList37'] != null) {
      this.formModel['userList37'].forEach(element => {
        let op = {"opNo" : element};
        opList37.push(op);
      });
    }

    let opList18 = [];
    if(this.formModel['userList18'] != null) {
      this.formModel['userList18'].forEach(element => {
        let op = {"opNo" : element};
        opList18.push(op);
      });
    }

    let opList28 = [];
    if(this.formModel['userList28'] != null) {
      this.formModel['userList28'].forEach(element => {
        let op = {"opNo" : element};
        opList28.push(op);
      });
    }

    let opList38 = [];
    if(this.formModel['userList38'] != null) {
      this.formModel['userList38'].forEach(element => {
        let op = {"opNo" : element};
        opList38.push(op);
      });
    }

    let opList19 = [];
    if(this.formModel['userList19'] != null) {
      this.formModel['userList19'].forEach(element => {
        let op = {"opNo" : element};
        opList19.push(op);
      });
    }

    let opList29 = [];
    if(this.formModel['userList29'] != null) {
      this.formModel['userList29'].forEach(element => {
        let op = {"opNo" : element};
        opList29.push(op);
      });
    }

    let opList39 = [];
    if(this.formModel['userList39'] != null) {
      this.formModel['userList39'].forEach(element => {
        let op = {"opNo" : element};
        opList39.push(op);
      });
    }

    let opList110 = [];
    if(this.formModel['userList110'] != null) {
      this.formModel['userList110'].forEach(element => {
        let op = {"opNo" : element};
        opList110.push(op);
      });
    }

    let opList210 = [];
    if(this.formModel['userList210'] != null) {
      this.formModel['userList210'].forEach(element => {
        let op = {"opNo" : element};
        opList210.push(op);
      });
    }

    let opList310 = [];
    if(this.formModel['userList310'] != null) {
      this.formModel['userList310'].forEach(element => {
        let op = {"opNo" : element};
        opList310.push(op);
      });
    }

    let opList111 = [];
    if(this.formModel['userList111'] != null) {
      this.formModel['userList111'].forEach(element => {
        let op = {"opNo" : element};
        opList111.push(op);
      });
    }

    let opList211 = [];
    if(this.formModel['userList211'] != null) {
      this.formModel['userList211'].forEach(element => {
        let op = {"opNo" : element};
        opList211.push(op);
      });
    }

    let opList311 = [];
    if(this.formModel['userList311'] != null) {
      this.formModel['userList311'].forEach(element => {
        let op = {"opNo" : element};
        opList311.push(op);
      });
    }

    let opList112 = [];
    if(this.formModel['userList112'] != null) {
      this.formModel['userList112'].forEach(element => {
        let op = {"opNo" : element};
        opList112.push(op);
      });
    }

    let opList212 = [];
    if(this.formModel['userList212'] != null) {
      this.formModel['userList212'].forEach(element => {
        let op = {"opNo" : element};
        opList212.push(op);
      });
    }

    let opList312 = [];
    if(this.formModel['userList312'] != null) {
      this.formModel['userList312'].forEach(element => {
        let op = {"opNo" : element};
        opList312.push(op);
      });
    }

    let opList113 = [];
    if(this.formModel['userList113'] != null) {
      this.formModel['userList113'].forEach(element => {
        let op = {"opNo" : element};
        opList113.push(op);
      });
    }

    let opList213 = [];
    if(this.formModel['userList213'] != null) {
      this.formModel['userList213'].forEach(element => {
        let op = {"opNo" : element};
        opList213.push(op);
      });
    }


    let opList313 = [];
    if(this.formModel['userList313'] != null) {
      this.formModel['userList313'].forEach(element => {
        let op = {"opNo" : element};
        opList313.push(op);
      });
    }

    let opList114 = [];
    if(this.formModel['userList114'] != null) {
      this.formModel['userList114'].forEach(element => {
        let op = {"opNo" : element};
        opList114.push(op);
      });
    }

    let opList214 = [];
    if(this.formModel['userList214'] != null) {
      this.formModel['userList214'].forEach(element => {
        let op = {"opNo" : element};
        opList214.push(op);
      });
    }

    let opList314 = [];
    if(this.formModel['userList314'] != null) {
      this.formModel['userList314'].forEach(element => {
        let op = {"opNo" : element};
        opList314.push(op);
      });
    }
    let opList115 = [];
    if(this.formModel['userList115'] != null) {
      this.formModel['userList115'].forEach(element => {
        let op = {"opNo" : element};
        opList115.push(op);
      });
    }

    let opList215 = [];
    if(this.formModel['userList215'] != null) {
      this.formModel['userList215'].forEach(element => {
        let op = {"opNo" : element};
        opList215.push(op);
      });
    }

    let opList315 = [];
    if(this.formModel['userList315'] != null) {
      this.formModel['userList315'].forEach(element => {
        let op = {"opNo" : element};
        opList315.push(op);
      });
    }

    let opList116 = [];
    if(this.formModel['userList116'] != null) {
      this.formModel['userList116'].forEach(element => {
        let op = {"opNo" : element};
        opList116.push(op);
      });
    }

    let opList216 = [];
    if(this.formModel['userList216'] != null) {
      this.formModel['userList216'].forEach(element => {
        let op = {"opNo" : element};
        opList216.push(op);
      });
    }

    let opList316 = [];
    if(this.formModel['userList316'] != null) {
      this.formModel['userList316'].forEach(element => {
        let op = {"opNo" : element};
        opList316.push(op);
      });
    }

    let opList117 = [];
    if(this.formModel['userList117'] != null) {
      this.formModel['userList117'].forEach(element => {
        let op = {"opNo" : element};
        opList117.push(op);
      });
    }

    let opList217 = [];
    if(this.formModel['userList217'] != null) {
      this.formModel['userList217'].forEach(element => {
        let op = {"opNo" : element};
        opList217.push(op);
      });
    }

    let opList317 = [];
    if(this.formModel['userList317'] != null) {
      this.formModel['userList317'].forEach(element => {
        let op = {"opNo" : element};
        opList317.push(op);
      });
    }

    let opList118 = [];
    if(this.formModel['userList118'] != null) {
      this.formModel['userList118'].forEach(element => {
        let op = {"opNo" : element};
        opList118.push(op);
      });
    }

    let opList218 = [];
    if(this.formModel['userList218'] != null) {
      this.formModel['userList218'].forEach(element => {
        let op = {"opNo" : element};
        opList218.push(op);
      });
    }

    let opList318 = [];
    if(this.formModel['userList318'] != null) {
      this.formModel['userList318'].forEach(element => {
        let op = {"opNo" : element};
        opList318.push(op);
      });
    }

    let opList119 = [];
    if(this.formModel['userList119'] != null) {
      this.formModel['userList119'].forEach(element => {
        let op = {"opNo" : element};
        opList119.push(op);
      });
    }

    let opList219 = [];
    if(this.formModel['userList219'] != null) {
      this.formModel['userList219'].forEach(element => {
        let op = {"opNo" : element};
        opList219.push(op);
      });
    }

    let opList319 = [];
    if(this.formModel['userList319'] != null) {
      this.formModel['userList319'].forEach(element => {
        let op = {"opNo" : element};
        opList319.push(op);
      });
    }

    let opList120 = [];
    if(this.formModel['userList120'] != null) {
      this.formModel['userList120'].forEach(element => {
        let op = {"opNo" : element};
        opList120.push(op);
      });
    }

    let opList220 = [];
    if(this.formModel['userList220'] != null) {
      this.formModel['userList220'].forEach(element => {
        let op = {"opNo" : element};
        opList220.push(op);
      });
    }


    let opList320 = [];
    if(this.formModel['userList320'] != null) {
      this.formModel['userList320'].forEach(element => {
        let op = {"opNo" : element};
        opList320.push(op);
      });
    }

    let opList121 = [];
    if(this.formModel['userList121'] != null) {
      this.formModel['userList121'].forEach(element => {
        let op = {"opNo" : element};
        opList121.push(op);
      });
    }

    let opList221 = [];
    if(this.formModel['userList221'] != null) {
      this.formModel['userList221'].forEach(element => {
        let op = {"opNo" : element};
        opList221.push(op);
      });
    }

    let opList321 = [];
    if(this.formModel['userList321'] != null) {
      this.formModel['userList321'].forEach(element => {
        let op = {"opNo" : element};
        opList321.push(op);
      });
    }

    let opList122 = [];
    if(this.formModel['userList122'] != null) {
      this.formModel['userList122'].forEach(element => {
        let op = {"opNo" : element};
        opList122.push(op);
      });
    }

    let opList222 = [];
    if(this.formModel['userList222'] != null) {
      this.formModel['userList222'].forEach(element => {
        let op = {"opNo" : element};
        opList222.push(op);
      });
    }

    let opList322 = [];
    if(this.formModel['userList322'] != null) {
      this.formModel['userList322'].forEach(element => {
        let op = {"opNo" : element};
        opList322.push(op);
      });
    }

    let opList123 = [];
    if(this.formModel['userList123'] != null) {
      this.formModel['userList123'].forEach(element => {
        let op = {"opNo" : element};
        opList123.push(op);
      });
    }

    let opList223 = [];
    if(this.formModel['userList223'] != null) {
      this.formModel['userList223'].forEach(element => {
        let op = {"opNo" : element};
        opList223.push(op);
      });
    }

    let opList323 = [];
    if(this.formModel['userList323'] != null) {
      this.formModel['userList323'].forEach(element => {
        let op = {"opNo" : element};
        opList323.push(op);
      });
    }

    let opList124 = [];
    if(this.formModel['userList124'] != null) {
      this.formModel['userList124'].forEach(element => {
        let op = {"opNo" : element};
        opList124.push(op);
      });
    }

    let opList224 = [];
    if(this.formModel['userList224'] != null) {
      this.formModel['userList224'].forEach(element => {
        let op = {"opNo" : element};
        opList224.push(op);
      });
    }

    let opList324 = [];
    if(this.formModel['userList324'] != null) {
      this.formModel['userList324'].forEach(element => {
        let op = {"opNo" : element};
        opList324.push(op);
      });
    }

    let opList125 = [];
    if(this.formModel['userList125'] != null) {
      this.formModel['userList125'].forEach(element => {
        let op = {"opNo" : element};
        opList125.push(op);
      });
    }

    let opList225 = [];
    if(this.formModel['userList225'] != null) {
      this.formModel['userList225'].forEach(element => {
        let op = {"opNo" : element};
        opList225.push(op);
      });
    }

    let opList325 = [];
    if(this.formModel['userList325'] != null) {
      this.formModel['userList325'].forEach(element => {
        let op = {"opNo" : element};
        opList325.push(op);
      });
    }

    let opList126 = [];
    if(this.formModel['userList126'] != null) {
      this.formModel['userList126'].forEach(element => {
        let op = {"opNo" : element};
        opList126.push(op);
      });
    }

    let opList226 = [];
    if(this.formModel['userList226'] != null) {
      this.formModel['userList226'].forEach(element => {
        let op = {"opNo" : element};
        opList226.push(op);
      });
    }

    let opList326 = [];
    if(this.formModel['userList326'] != null) {
      this.formModel['userList326'].forEach(element => {
        let op = {"opNo" : element};
        opList326.push(op);
      });
    }

    let opList127 = [];
    if(this.formModel['userList127'] != null) {
      this.formModel['userList127'].forEach(element => {
        let op = {"opNo" : element};
        opList127.push(op);
      });
    }

    let opList227 = [];
    if(this.formModel['userList227'] != null) {
      this.formModel['userList227'].forEach(element => {
        let op = {"opNo" : element};
        opList227.push(op);
      });
    }


    let opList327 = [];
    if(this.formModel['userList327'] != null) {
      this.formModel['userList327'].forEach(element => {
        let op = {"opNo" : element};
        opList327.push(op);
      });
    }

    let opList128 = [];
    if(this.formModel['userList128'] != null) {
      this.formModel['userList128'].forEach(element => {
        let op = {"opNo" : element};
        opList128.push(op);
      });
    }

    let opList228 = [];
    if(this.formModel['userList228'] != null) {
      this.formModel['userList228'].forEach(element => {
        let op = {"opNo" : element};
        opList228.push(op);
      });
    }

    let opList328 = [];
    if(this.formModel['userList328'] != null) {
      this.formModel['userList328'].forEach(element => {
        let op = {"opNo" : element};
        opList328.push(op);
      });
    }

    let opList129 = [];
    if(this.formModel['userList129'] != null) {
      this.formModel['userList129'].forEach(element => {
        let op = {"opNo" : element};
        opList129.push(op);
      });
    }

    let opList229 = [];
    if(this.formModel['userList229'] != null) {
      this.formModel['userList229'].forEach(element => {
        let op = {"opNo" : element};
        opList229.push(op);
      });
    }

    let opList329 = [];
    if(this.formModel['userList329'] != null) {
      this.formModel['userList329'].forEach(element => {
        let op = {"opNo" : element};
        opList29.push(op);
      });
    }

    let opList130 = [];
    if(this.formModel['userList130'] != null) {
      this.formModel['userList130'].forEach(element => {
        let op = {"opNo" : element};
        opList130.push(op);
      });
    }

    let opList230 = [];
    if(this.formModel['userList230'] != null) {
      this.formModel['userList230'].forEach(element => {
        let op = {"opNo" : element};
        opList230.push(op);
      });
    }

    let opList330 = [];
    if(this.formModel['userList330'] != null) {
      this.formModel['userList330'].forEach(element => {
        let op = {"opNo" : element};
        opList330.push(op);
      });
    }

    let opList131 = [];
    if(this.formModel['userList131'] != null) {
      this.formModel['userList131'].forEach(element => {
        let op = {"opNo" : element};
        opList131.push(op);
      });
    }

    let opList231 = [];
    if(this.formModel['userList231'] != null) {
      this.formModel['userList231'].forEach(element => {
        let op = {"opNo" : element};
        opList231.push(op);
      });
    }

    let opList331 = [];
    if(this.formModel['userList331'] != null) {
      this.formModel['userList331'].forEach(element => {
        let op = {"opNo" : element};
        opList331.push(op);
      });
    }

    params['detailList'] = [
      {
        'countNo' : 1,
        'classesNo' : '1',
        'opList' : opList11,
      },
      {
        'countNo' : 1,
        'classesNo' : '2',
        'opList' : opList21,
      },
      {
        'countNo' : 1,
        'classesNo' : '3',
        'opList' : opList31,
      },
      {
        'countNo' : 2,
        'classesNo' : '1',
        'opList' : opList12,
      },
      {
        'countNo' : 2,
        'classesNo' : '2',
        'opList' : opList22,
      },
      {
        'countNo' : 2,
        'classesNo' : '3',
        'opList' : opList32,
      },
      {
        'countNo' : 3,
        'classesNo' : '1',
        'opList' : opList13,
      },
      {
        'countNo' : 3,
        'classesNo' : '2',
        'opList' : opList23,
      },
      {
        'countNo' : 3,
        'classesNo' : '3',
        'opList' : opList33,
      },
      {
        'countNo' : 4,
        'classesNo' : '1',
        'opList' : opList14,
      },
      {
        'countNo' : 4,
        'classesNo' : '2',
        'opList' : opList24,
      },
      {
        'countNo' : 4,
        'classesNo' : '3',
        'opList' : opList34,
      },
      {
        'countNo' : 5,
        'classesNo' : '1',
        'opList' : opList15,
      },
      {
        'countNo' : 5,
        'classesNo' : '2',
        'opList' : opList25,
      },
      {
        'countNo' : 5,
        'classesNo' : '3',
        'opList' : opList35,
      },
      {
        'countNo' : 6,
        'classesNo' : '1',
        'opList' : opList16,
      },
      {
        'countNo' : 6,
        'classesNo' : '2',
        'opList' : opList26,
      },
      {
        'countNo' : 6,
        'classesNo' : '3',
        'opList' : opList36,
      },
      {
        'countNo' : 7,
        'classesNo' : '1',
        'opList' : opList17,
      },
      {
        'countNo' : 7,
        'classesNo' : '2',
        'opList' : opList27,
      },
      {
        'countNo' : 7,
        'classesNo' : '3',
        'opList' : opList37,
      },
      {
        'countNo' : 8,
        'classesNo' : '1',
        'opList' : opList18,
      },
      {
        'countNo' : 8,
        'classesNo' : '2',
        'opList' : opList28,
      },
      {
        'countNo' : 8,
        'classesNo' : '3',
        'opList' : opList38,
      },
      {
        'countNo' : 9,
        'classesNo' : '1',
        'opList' : opList19,
      },
      {
        'countNo' : 9,
        'classesNo' : '2',
        'opList' : opList29,
      },
      {
        'countNo' : 9,
        'classesNo' : '3',
        'opList' : opList39,
      },
      {
        'countNo' : 10,
        'classesNo' : '1',
        'opList' : opList110,
      },
      {
        'countNo' : 10,
        'classesNo' : '2',
        'opList' : opList210,
      },
      {
        'countNo' : 10,
        'classesNo' : '3',
        'opList' : opList310,
      },
      {
        'countNo' : 11,
        'classesNo' : '1',
        'opList' : opList111,
      },
      {
        'countNo' : 11,
        'classesNo' : '2',
        'opList' : opList211,
      },
      {
        'countNo' : 11,
        'classesNo' : '3',
        'opList' : opList311,
      },
      {
        'countNo' : 12,
        'classesNo' : '1',
        'opList' : opList112,
      },
      {
        'countNo' : 12,
        'classesNo' : '2',
        'opList' : opList212,
      },
      {
        'countNo' : 12,
        'classesNo' : '3',
        'opList' : opList312,
      },
      {
        'countNo' : 13,
        'classesNo' : '1',
        'opList' : opList113,
      },
      {
        'countNo' : 13,
        'classesNo' : '2',
        'opList' : opList213,
      },
      {
        'countNo' : 13,
        'classesNo' : '3',
        'opList' : opList313,
      },
      {
        'countNo' : 14,
        'classesNo' : '1',
        'opList' : opList114,
      },
      {
        'countNo' : 14,
        'classesNo' : '2',
        'opList' : opList214,
      },
      {
        'countNo' : 14,
        'classesNo' : '3',
        'opList' : opList314,
      },
      {
        'countNo' : 15,
        'classesNo' : '1',
        'opList' : opList115,
      },
      {
        'countNo' : 15,
        'classesNo' : '2',
        'opList' : opList215,
      },
      {
        'countNo' : 15,
        'classesNo' : '3',
        'opList' : opList315,
      },
      {
        'countNo' : 16,
        'classesNo' : '1',
        'opList' : opList116,
      },
      {
        'countNo' : 16,
        'classesNo' : '2',
        'opList' : opList216,
      },
      {
        'countNo' : 16,
        'classesNo' : '3',
        'opList' : opList316,
      },
      {
        'countNo' : 17,
        'classesNo' : '1',
        'opList' : opList117,
      },
      {
        'countNo' : 17,
        'classesNo' : '2',
        'opList' : opList217,
      },
      {
        'countNo' : 17,
        'classesNo' : '3',
        'opList' : opList317,
      },
      {
        'countNo' : 18,
        'classesNo' : '1',
        'opList' : opList118,
      },
      {
        'countNo' : 18,
        'classesNo' : '2',
        'opList' : opList218,
      },
      {
        'countNo' : 18,
        'classesNo' : '3',
        'opList' : opList318,
      },
      {
        'countNo' : 19,
        'classesNo' : '1',
        'opList' : opList119,
      },
      {
        'countNo' : 19,
        'classesNo' : '2',
        'opList' : opList219,
      },
      {
        'countNo' : 19,
        'classesNo' : '3',
        'opList' : opList319,
      },
      {
        'countNo' : 20,
        'classesNo' : '1',
        'opList' : opList120,
      },
      {
        'countNo' : 20,
        'classesNo' : '2',
        'opList' : opList220,
      },
      {
        'countNo' : 20,
        'classesNo' : '3',
        'opList' : opList320,
      },
      {
        'countNo' : 21,
        'classesNo' : '1',
        'opList' : opList121,
      },
      {
        'countNo' : 21,
        'classesNo' : '2',
        'opList' : opList221,
      },
      {
        'countNo' : 21,
        'classesNo' : '3',
        'opList' : opList321,
      },
      {
        'countNo' : 22,
        'classesNo' : '1',
        'opList' : opList122,
      },
      {
        'countNo' : 22,
        'classesNo' : '2',
        'opList' : opList222,
      },
      {
        'countNo' : 22,
        'classesNo' : '3',
        'opList' : opList322,
      },
      {
        'countNo' : 23,
        'classesNo' : '1',
        'opList' : opList123,
      },
      {
        'countNo' : 23,
        'classesNo' : '2',
        'opList' : opList223,
      },
      {
        'countNo' : 23,
        'classesNo' : '3',
        'opList' : opList323,
      },
      {
        'countNo' : 24,
        'classesNo' : '1',
        'opList' : opList124,
      },
      {
        'countNo' : 24,
        'classesNo' : '2',
        'opList' : opList224,
      },
      {
        'countNo' : 24,
        'classesNo' : '3',
        'opList' : opList324,
      },
      {
        'countNo' : 25,
        'classesNo' : '1',
        'opList' : opList125,
      },
      {
        'countNo' : 25,
        'classesNo' : '2',
        'opList' : opList225,
      },
      {
        'countNo' : 25,
        'classesNo' : '3',
        'opList' : opList329,
      },
      {
        'countNo' : 26,
        'classesNo' : '1',
        'opList' : opList126,
      },
      {
        'countNo' : 26,
        'classesNo' : '2',
        'opList' : opList226,
      },
      {
        'countNo' : 26,
        'classesNo' : '3',
        'opList' : opList326,
      },
      {
        'countNo' : 27,
        'classesNo' : '1',
        'opList' : opList127,
      },
      {
        'countNo' : 27,
        'classesNo' : '2',
        'opList' : opList227,
      },
      {
        'countNo' : 27,
        'classesNo' : '3',
        'opList' : opList327,
      },
      {
        'countNo' : 28,
        'classesNo' : '1',
        'opList' : opList128,
      },
      {
        'countNo' : 28,
        'classesNo' : '2',
        'opList' : opList228,
      },
      {
        'countNo' : 28,
        'classesNo' : '3',
        'opList' : opList328,
      },
      {
        'countNo' : 29,
        'classesNo' : '1',
        'opList' : opList129,
      },
      {
        'countNo' : 29,
        'classesNo' : '2',
        'opList' : opList229,
      },
      {
        'countNo' : 29,
        'classesNo' : '3',
        'opList' : opList329,
      },
      {
        'countNo' : 30,
        'classesNo' : '1',
        'opList' : opList130,
      },
      {
        'countNo' : 30,
        'classesNo' : '2',
        'opList' : opList230,
      },
      {
        'countNo' : 30,
        'classesNo' : '3',
        'opList' : opList330,
      },
      {
        'countNo' : 31,
        'classesNo' : '1',
        'opList' : opList131,
      },
      {
        'countNo' : 31,
        'classesNo' : '2',
        'opList' : opList231,
      },
      {
        'countNo' : 31,
        'classesNo' : '3',
        'opList' : opList331,
      }

    ]

    this.service.addPostMould(params).subscribe(_data => {
          this.loading = false;
          this.message.success(`成功！`);
          // this.nzModal.destroy('onOk');
          this.nzModal.triggerOk();
      }, (error) => {
          this.loading = false;
          console.log(error);
          if (error instanceof HttpResponse) {
              this.message.error(error.body.retMsg);
          }
      });
  }

}
