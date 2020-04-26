import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {SessionService} from '@core/session.service';
import {PostScheduleService} from "../../../post-schedule.service";

@Component({
  selector: 'app-mod-postSchedulePlan-month',
  templateUrl: './mod-schedulePlan-month.component.html',
  styles: [`
        form>div {
            padding: 8px 0;
        }
    `]
})
export class ModSchedulePlanMonthComponent implements OnInit {
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
            this.userList12 = _data['retList'];
            this.userList13 = _data['retList'];
            this.userList14 = _data['retList'];
            this.userList15 = _data['retList'];
            this.userList16 = _data['retList'];
            this.userList17 = _data['retList'];
            this.userList18 = _data['retList'];
            this.userList19 = _data['retList'];
            this.userList110 = _data['retList'];
            this.userList111 = _data['retList'];
            this.userList112 = _data['retList'];
            this.userList113 = _data['retList'];
            this.userList114 = _data['retList'];
            this.userList115 = _data['retList'];
            this.userList116 = _data['retList'];
            this.userList117 = _data['retList'];
            this.userList118 = _data['retList'];
            this.userList119 = _data['retList'];
            this.userList120 = _data['retList'];
            this.userList121 = _data['retList'];
            this.userList122 = _data['retList'];
            this.userList123 = _data['retList'];
            this.userList124 = _data['retList'];
            this.userList125 = _data['retList'];
            this.userList126 = _data['retList'];
            this.userList127 = _data['retList'];
            this.userList128 = _data['retList'];
            this.userList129 = _data['retList'];
            this.userList130 = _data['retList'];
            this.userList131 = _data['retList'];

            this.userList21 = _data['retList'];
            this.userList22 = _data['retList'];
            this.userList23 = _data['retList'];
            this.userList24 = _data['retList'];
            this.userList25 = _data['retList'];
            this.userList26 = _data['retList'];
            this.userList27 = _data['retList'];
            this.userList28 = _data['retList'];
            this.userList29 = _data['retList'];
            this.userList210 = _data['retList'];
            this.userList211 = _data['retList'];
            this.userList212 = _data['retList'];
            this.userList213 = _data['retList'];
            this.userList214 = _data['retList'];
            this.userList215 = _data['retList'];
            this.userList216 = _data['retList'];
            this.userList217 = _data['retList'];
            this.userList218 = _data['retList'];
            this.userList219 = _data['retList'];
            this.userList220 = _data['retList'];
            this.userList221 = _data['retList'];
            this.userList222 = _data['retList'];
            this.userList223 = _data['retList'];
            this.userList224 = _data['retList'];
            this.userList225 = _data['retList'];
            this.userList226 = _data['retList'];
            this.userList227 = _data['retList'];
            this.userList228 = _data['retList'];
            this.userList229 = _data['retList'];
            this.userList230 = _data['retList'];
            this.userList231 = _data['retList'];

            this.userList31 = _data['retList'];
            this.userList32 = _data['retList'];
            this.userList33 = _data['retList'];
            this.userList34 = _data['retList'];
            this.userList35 = _data['retList'];
            this.userList36 = _data['retList'];
            this.userList37 = _data['retList'];
            this.userList38 = _data['retList'];
            this.userList39 = _data['retList'];
            this.userList310 = _data['retList'];
            this.userList311 = _data['retList'];
            this.userList312 = _data['retList'];
            this.userList313 = _data['retList'];
            this.userList314 = _data['retList'];
            this.userList315 = _data['retList'];
            this.userList316 = _data['retList'];
            this.userList317 = _data['retList'];
            this.userList318 = _data['retList'];
            this.userList319 = _data['retList'];
            this.userList320 = _data['retList'];
            this.userList321 = _data['retList'];
            this.userList322 = _data['retList'];
            this.userList323 = _data['retList'];
            this.userList324 = _data['retList'];
            this.userList325 = _data['retList'];
            this.userList326 = _data['retList'];
            this.userList327 = _data['retList'];
            this.userList328 = _data['retList'];
            this.userList329 = _data['retList'];
            this.userList330 = _data['retList'];
            this.userList331 = _data['retList'];

        }, (error) => {
          this.loading = false;
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });

    this.data.detailList.forEach(detail => {
      if(detail.classesNo == "1" && detail.planDate == '1') {
        let opList11 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList11.push(op);
        });
        this.formModel['userList11'] = opList11.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '1') {
        let opList21 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList21.push(op);
        });
        this.formModel['userList21'] = opList21.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '1') {
        let opList31 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList31.push(op);
        });
        this.formModel['userList31'] = opList31.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '2') {
        let opList12 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList12.push(op);
        });
        this.formModel['userList12'] = opList12.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '2') {
        let opList22 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList22.push(op);
        });
        this.formModel['userList22'] = opList22.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '2') {
        let opList32 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList32.push(op);
        });
        this.formModel['userList32'] = opList32.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '3') {
        let opList13 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList13.push(op);
        });
        this.formModel['userList13'] = opList13.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '3') {
        let opList23 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList23.push(op);
        });
        this.formModel['userList23'] = opList23.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '3') {
        let opList33 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList33.push(op);
        });
        this.formModel['userList33'] = opList33.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '4') {
        let opList14 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList14.push(op);
        });
        this.formModel['userList14'] = opList14.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '4') {
        let opList24 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList24.push(op);
        });
        this.formModel['userList24'] = opList24.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '4') {
        let opList34 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList34.push(op);
        });
        this.formModel['userList34'] = opList34.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '5') {
        let opList15 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList15.push(op);
        });
        this.formModel['userList15'] = opList15.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '5') {
        let opList25 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList25.push(op);
        });
        this.formModel['userList25'] = opList25.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '5') {
        let opList35 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList35.push(op);
        });
        this.formModel['userList35'] = opList35.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '6') {
        let opList16 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList16.push(op);
        });
        this.formModel['userList16'] = opList16.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '6') {
        let opList26 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList26.push(op);
        });
        this.formModel['userList26'] = opList26.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '6') {
        let opList36 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList36.push(op);
        });
        this.formModel['userList36'] = opList36.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '7') {
        let opList17 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList17.push(op);
        });
        this.formModel['userList17'] = opList17.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '7') {
        let opList27 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList27.push(op);
        });
        this.formModel['userList27'] = opList27.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '7') {
        let opList37 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList37.push(op);
        });
        this.formModel['userList37'] = opList37.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '8') {
        let opList18 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList18.push(op);
        });
        this.formModel['userList18'] = opList18.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '8') {
        let opList28 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList28.push(op);
        });
        this.formModel['userList28'] = opList28.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '8') {
        let opList38 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList38.push(op);
        });
        this.formModel['userList38'] = opList38.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '9') {
        let opList19 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList19.push(op);
        });
        this.formModel['userList19'] = opList19.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '9') {
        let opList29 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList29.push(op);
        });
        this.formModel['userList29'] = opList29.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '9') {
        let opList39 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList39.push(op);
        });
        this.formModel['userList39'] = opList39.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '10') {
        let opList110 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList110.push(op);
        });
        this.formModel['userList110'] = opList110.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '10') {
        let opList210 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList210.push(op);
        });
        this.formModel['userList210'] = opList210.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '10') {
        let opList310 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList310.push(op);
        });
        this.formModel['userList310'] = opList310.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '11') {
        let opList111 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList111.push(op);
        });
        this.formModel['userList111'] = opList111.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '11') {
        let opList211 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList211.push(op);
        });
        this.formModel['userList211'] = opList211.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '11') {
        let opList311 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList311.push(op);
        });
        this.formModel['userList311'] = opList311.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '12') {
        let opList112 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList112.push(op);
        });
        this.formModel['userList112'] = opList112.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '12') {
        let opList212 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList212.push(op);
        });
        this.formModel['userList212'] = opList212.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '12') {
        let opList312 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList312.push(op);
        });
        this.formModel['userList312'] = opList312.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '13') {
        let opList113 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList113.push(op);
        });
        this.formModel['userList113'] = opList113.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '13') {
        let opList213 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList213.push(op);
        });
        this.formModel['userList213'] = opList213.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '13') {
        let opList313 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList313.push(op);
        });
        this.formModel['userList313'] = opList313.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '14') {
        let opList114 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList114.push(op);
        });
        this.formModel['userList114'] = opList114.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '14') {
        let opList214 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList214.push(op);
        });
        this.formModel['userList214'] = opList214.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '14') {
        let opList314 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList314.push(op);
        });
        this.formModel['userList314'] = opList314.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '15') {
        let opList115 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList115.push(op);
        });
        this.formModel['userList115'] = opList115.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '15') {
        let opList215 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList215.push(op);
        });
        this.formModel['userList215'] = opList215.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '15') {
        let opList315 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList315.push(op);
        });
        this.formModel['userList315'] = opList315.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '16') {
        let opList116 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList116.push(op);
        });
        this.formModel['userList116'] = opList116.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '16') {
        let opList216 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList216.push(op);
        });
        this.formModel['userList216'] = opList216.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '16') {
        let opList316 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList316.push(op);
        });
        this.formModel['userList316'] = opList316.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '17') {
        let opList117 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList117.push(op);
        });
        this.formModel['userList117'] = opList117.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '17') {
        let opList217 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList217.push(op);
        });
        this.formModel['userList217'] = opList217.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '17') {
        let opList317 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList317.push(op);
        });
        this.formModel['userList317'] = opList317.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '18') {
        let opList118 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList118.push(op);
        });
        this.formModel['userList118'] = opList118.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '18') {
        let opList218 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList218.push(op);
        });
        this.formModel['userList218'] = opList218.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '18') {
        let opList318 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList318.push(op);
        });
        this.formModel['userList318'] = opList318.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '19') {
        let opList119 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList119.push(op);
        });
        this.formModel['userList119'] = opList119.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '19') {
        let opList219 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList219.push(op);
        });
        this.formModel['userList219'] = opList219.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '19') {
        let opList319 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList319.push(op);
        });
        this.formModel['userList319'] = opList319.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '20') {
        let opList120 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList120.push(op);
        });
        this.formModel['userList120'] = opList120.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '20') {
        let opList220 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList220.push(op);
        });
        this.formModel['userList220'] = opList220.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '20') {
        let opList320 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList320.push(op);
        });
        this.formModel['userList320'] = opList320.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '21') {
        let opList121 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList121.push(op);
        });
        this.formModel['userList121'] = opList121.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '21') {
        let opList221 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList221.push(op);
        });
        this.formModel['userList221'] = opList221.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '21') {
        let opList321 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList321.push(op);
        });
        this.formModel['userList321'] = opList321.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '22') {
        let opList122 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList122.push(op);
        });
        this.formModel['userList122'] = opList122.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '22') {
        let opList222 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList222.push(op);
        });
        this.formModel['userList222'] = opList222.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '22') {
        let opList322 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList322.push(op);
        });
        this.formModel['userList322'] = opList322.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '23') {
        let opList123 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList123.push(op);
        });
        this.formModel['userList123'] = opList123.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '23') {
        let opList223 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList223.push(op);
        });
        this.formModel['userList223'] = opList223.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '23') {
        let opList323 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList323.push(op);
        });
        this.formModel['userList323'] = opList323.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '24') {
        let opList124 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList124.push(op);
        });
        this.formModel['userList124'] = opList124.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '24') {
        let opList224 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList224.push(op);
        });
        this.formModel['userList224'] = opList224.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '24') {
        let opList324 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList324.push(op);
        });
        this.formModel['userList324'] = opList324.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '25') {
        let opList125 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList125.push(op);
        });
        this.formModel['userList125'] = opList125.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '25') {
        let opList225 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList225.push(op);
        });
        this.formModel['userList225'] = opList225.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '25') {
        let opList325 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList325.push(op);
        });
        this.formModel['userList325'] = opList325.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '26') {
        let opList126 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList126.push(op);
        });
        this.formModel['userList126'] = opList126.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '26') {
        let opList226 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList226.push(op);
        });
        this.formModel['userList226'] = opList226.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '26') {
        let opList326 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList326.push(op);
        });
        this.formModel['userList326'] = opList326.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '27') {
        let opList127 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList127.push(op);
        });
        this.formModel['userList127'] = opList127.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '27') {
        let opList227 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList227.push(op);
        });
        this.formModel['userList227'] = opList227.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '27') {
        let opList327 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList327.push(op);
        });
        this.formModel['userList327'] = opList327.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '28') {
        let opList128 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList128.push(op);
        });
        this.formModel['userList128'] = opList128.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '28') {
        let opList228 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList228.push(op);
        });
        this.formModel['userList228'] = opList228.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '28') {
        let opList328 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList328.push(op);
        });
        this.formModel['userList328'] = opList328.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '29') {
        let opList129 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList129.push(op);
        });
        this.formModel['userList129'] = opList129.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '29') {
        let opList229 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList229.push(op);
        });
        this.formModel['userList229'] = opList229.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '29') {
        let opList329 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList329.push(op);
        });
        this.formModel['userList329'] = opList329.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '30') {
        let opList130 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList130.push(op);
        });
        this.formModel['userList130'] = opList130.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '30') {
        let opList230 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList230.push(op);
        });
        this.formModel['userList230'] = opList230.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '30') {
        let opList330 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList330.push(op);
        });
        this.formModel['userList330'] = opList330.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.planDate == '31') {
        let opList131 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList131.push(op);
        });
        this.formModel['userList131'] = opList131.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.planDate == '31') {
        let opList231 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList231.push(op);
        });
        this.formModel['userList231'] = opList231.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.planDate == '31') {
        let opList331 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList331.push(op);
        });
        this.formModel['userList331'] = opList331.map(item =>item.userName);
      }


    });

    const scheduleMonth = this.data.scheduleMonth + '';
    console.log(scheduleMonth);
    console.log(scheduleMonth.substring(5));
    const month = scheduleMonth.substring(5);
    if(month == '1' || month == '3' || month == '5' || month == '7' || month == '8' || month == '10' || month == '12') {
      this.month31 = true;
    }

    if(month == '2') {
      this.month28 = false;
    }



  }

  month31 = false;
  month28 = true;

  openSure() {
    const params: any = {};
    params['mouldName'] = this.data.mouldName;
    params['orgNo'] = this.data.orgNo;
    params['mouldType'] = this.data.mouldType;
    params['postNo'] = this.data.postNo;
    params['scheduleMonth'] = this.data.scheduleMonth;
    params['planNo'] = this.data.planNo;

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
        'planDate' : '1',
        'classesNo' : '1',
        'opList' : opList11,
      },
      {
        'planDate' : '1',
        'classesNo' : '2',
        'opList' : opList21,
      },
      {
        'planDate' : '1',
        'classesNo' : '3',
        'opList' : opList31,
      },
      {
        'planDate' : '2',
        'classesNo' : '1',
        'opList' : opList12,
      },
      {
        'planDate' : '2',
        'classesNo' : '2',
        'opList' : opList22,
      },
      {
        'planDate' : '2',
        'classesNo' : '3',
        'opList' : opList32,
      },
      {
        'planDate' : '3',
        'classesNo' : '1',
        'opList' : opList13,
      },
      {
        'planDate' : '3',
        'classesNo' : '2',
        'opList' : opList23,
      },
      {
        'planDate' : '3',
        'classesNo' : '3',
        'opList' : opList33,
      },
      {
        'planDate' : '4',
        'classesNo' : '1',
        'opList' : opList14,
      },
      {
        'planDate' : '4',
        'classesNo' : '2',
        'opList' : opList24,
      },
      {
        'planDate' : '4',
        'classesNo' : '3',
        'opList' : opList34,
      },
      {
        'planDate' : '5',
        'classesNo' : '1',
        'opList' : opList15,
      },
      {
        'planDate' : '5',
        'classesNo' : '2',
        'opList' : opList25,
      },
      {
        'planDate' : '5',
        'classesNo' : '3',
        'opList' : opList35,
      },
      {
        'planDate' : '6',
        'classesNo' : '1',
        'opList' : opList16,
      },
      {
        'planDate' : '6',
        'classesNo' : '2',
        'opList' : opList26,
      },
      {
        'planDate' : '6',
        'classesNo' : '3',
        'opList' : opList36,
      },
      {
        'planDate' : '7',
        'classesNo' : '1',
        'opList' : opList17,
      },
      {
        'planDate' : '7',
        'classesNo' : '2',
        'opList' : opList27,
      },
      {
        'planDate' : '7',
        'classesNo' : '3',
        'opList' : opList37,
      },
      {
        'planDate' : '8',
        'classesNo' : '1',
        'opList' : opList18,
      },
      {
        'planDate' : '8',
        'classesNo' : '2',
        'opList' : opList28,
      },
      {
        'planDate' : '8',
        'classesNo' : '3',
        'opList' : opList38,
      },
      {
        'planDate' : '9',
        'classesNo' : '1',
        'opList' : opList19,
      },
      {
        'planDate' : '9',
        'classesNo' : '2',
        'opList' : opList29,
      },
      {
        'planDate' : '9',
        'classesNo' : '3',
        'opList' : opList39,
      },
      {
        'planDate' : '10',
        'classesNo' : '1',
        'opList' : opList110,
      },
      {
        'planDate' : '10',
        'classesNo' : '2',
        'opList' : opList210,
      },
      {
        'planDate' : '10',
        'classesNo' : '3',
        'opList' : opList310,
      },
      {
        'planDate' : '11',
        'classesNo' : '1',
        'opList' : opList111,
      },
      {
        'planDate' : '11',
        'classesNo' : '2',
        'opList' : opList211,
      },
      {
        'planDate' : '11',
        'classesNo' : '3',
        'opList' : opList311,
      },
      {
        'planDate' : '12',
        'classesNo' : '1',
        'opList' : opList112,
      },
      {
        'planDate' : '12',
        'classesNo' : '2',
        'opList' : opList212,
      },
      {
        'planDate' : '12',
        'classesNo' : '3',
        'opList' : opList312,
      },
      {
        'planDate' : '13',
        'classesNo' : '1',
        'opList' : opList113,
      },
      {
        'planDate' : '13',
        'classesNo' : '2',
        'opList' : opList213,
      },
      {
        'planDate' : '13',
        'classesNo' : '3',
        'opList' : opList313,
      },
      {
        'planDate' : '14',
        'classesNo' : '1',
        'opList' : opList114,
      },
      {
        'planDate' : '14',
        'classesNo' : '2',
        'opList' : opList214,
      },
      {
        'planDate' : '14',
        'classesNo' : '3',
        'opList' : opList314,
      },
      {
        'planDate' : '15',
        'classesNo' : '1',
        'opList' : opList115,
      },
      {
        'planDate' : '15',
        'classesNo' : '2',
        'opList' : opList215,
      },
      {
        'planDate' : '15',
        'classesNo' : '3',
        'opList' : opList315,
      },
      {
        'planDate' : '16',
        'classesNo' : '1',
        'opList' : opList116,
      },
      {
        'planDate' : '16',
        'classesNo' : '2',
        'opList' : opList216,
      },
      {
        'planDate' : '16',
        'classesNo' : '3',
        'opList' : opList316,
      },
      {
        'planDate' : '17',
        'classesNo' : '1',
        'opList' : opList117,
      },
      {
        'planDate' : '17',
        'classesNo' : '2',
        'opList' : opList217,
      },
      {
        'planDate' : '17',
        'classesNo' : '3',
        'opList' : opList317,
      },
      {
        'planDate' : '18',
        'classesNo' : '1',
        'opList' : opList118,
      },
      {
        'planDate' : '18',
        'classesNo' : '2',
        'opList' : opList218,
      },
      {
        'planDate' : '18',
        'classesNo' : '3',
        'opList' : opList318,
      },
      {
        'planDate' : '19',
        'classesNo' : '1',
        'opList' : opList119,
      },
      {
        'planDate' : '19',
        'classesNo' : '2',
        'opList' : opList219,
      },
      {
        'planDate' : '19',
        'classesNo' : '3',
        'opList' : opList319,
      },
      {
        'planDate' : '20',
        'classesNo' : '1',
        'opList' : opList120,
      },
      {
        'planDate' : '20',
        'classesNo' : '2',
        'opList' : opList220,
      },
      {
        'planDate' : '20',
        'classesNo' : '3',
        'opList' : opList320,
      },
      {
        'planDate' : '21',
        'classesNo' : '1',
        'opList' : opList121,
      },
      {
        'planDate' : '21',
        'classesNo' : '2',
        'opList' : opList221,
      },
      {
        'planDate' : '21',
        'classesNo' : '3',
        'opList' : opList321,
      },
      {
        'planDate' : '22',
        'classesNo' : '1',
        'opList' : opList122,
      },
      {
        'planDate' : '22',
        'classesNo' : '2',
        'opList' : opList222,
      },
      {
        'planDate' : '22',
        'classesNo' : '3',
        'opList' : opList322,
      },
      {
        'planDate' : '23',
        'classesNo' : '1',
        'opList' : opList123,
      },
      {
        'planDate' : '23',
        'classesNo' : '2',
        'opList' : opList223,
      },
      {
        'planDate' : '23',
        'classesNo' : '3',
        'opList' : opList323,
      },
      {
        'planDate' : '24',
        'classesNo' : '1',
        'opList' : opList124,
      },
      {
        'planDate' : '24',
        'classesNo' : '2',
        'opList' : opList224,
      },
      {
        'planDate' : '24',
        'classesNo' : '3',
        'opList' : opList324,
      },
      {
        'planDate' : '25',
        'classesNo' : '1',
        'opList' : opList125,
      },
      {
        'planDate' : '25',
        'classesNo' : '2',
        'opList' : opList225,
      },
      {
        'planDate' : '25',
        'classesNo' : '3',
        'opList' : opList329,
      },
      {
        'planDate' : '26',
        'classesNo' : '1',
        'opList' : opList126,
      },
      {
        'planDate' : '26',
        'classesNo' : '2',
        'opList' : opList226,
      },
      {
        'planDate' : '26',
        'classesNo' : '3',
        'opList' : opList326,
      },
      {
        'planDate' : '27',
        'classesNo' : '1',
        'opList' : opList127,
      },
      {
        'planDate' : '27',
        'classesNo' : '2',
        'opList' : opList227,
      },
      {
        'planDate' : '27',
        'classesNo' : '3',
        'opList' : opList327,
      },
      {
        'planDate' : '28',
        'classesNo' : '1',
        'opList' : opList128,
      },
      {
        'planDate' : '28',
        'classesNo' : '2',
        'opList' : opList228,
      },
      {
        'planDate' : '28',
        'classesNo' : '3',
        'opList' : opList328,
      },
      {
        'planDate' : '29',
        'classesNo' : '1',
        'opList' : opList129,
      },
      {
        'planDate' : '29',
        'classesNo' : '2',
        'opList' : opList229,
      },
      {
        'planDate' : '29',
        'classesNo' : '3',
        'opList' : opList329,
      },
      {
        'planDate' : '30',
        'classesNo' : '1',
        'opList' : opList130,
      },
      {
        'planDate' : '30',
        'classesNo' : '2',
        'opList' : opList230,
      },
      {
        'planDate' : '30',
        'classesNo' : '3',
        'opList' : opList330,
      },
      {
        'planDate' : '31',
        'classesNo' : '1',
        'opList' : opList131,
      },
      {
        'planDate' : '31',
        'classesNo' : '2',
        'opList' : opList231,
      },
      {
        'planDate' : '31',
        'classesNo' : '3',
        'opList' : opList331,
      }

    ]

    this.service.modPostSchedulePlan(params).subscribe(_data => {
          this.loading = false;
          this.message.success(`成功！`);
          this.nzModal.destroy('onOk');
      }, (error) => {
          this.loading = false;
          console.log(error);
          if (error instanceof HttpResponse) {
              this.message.error(error.body.retMsg);
          }
      });
  }
}
