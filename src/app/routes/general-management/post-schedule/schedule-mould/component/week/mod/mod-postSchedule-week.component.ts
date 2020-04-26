import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {SessionService} from '@core/session.service';
import {PostScheduleService} from "../../../../post-schedule.service";

@Component({
  selector: 'app-mod-postSchedule-week',
  templateUrl: './mod-postSchedule-week.component.html',
  styles: [`
        form>div {
            padding: 8px 0;
        }
    `]
})
export class ModPostScheduleWeekComponent implements OnInit {
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

  userList11;userList12;userList13;userList14;userList15;userList16;userList17;
  userList21;userList22;userList23;userList24;userList25;userList26;userList27;
  userList31;userList32;userList33;userList34;userList35;userList36;userList37;

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
            this.userList21 = _data['retList'];
            this.userList22 = _data['retList'];
            this.userList23 = _data['retList'];
            this.userList24 = _data['retList'];
            this.userList25 = _data['retList'];
            this.userList26 = _data['retList'];
            this.userList27 = _data['retList'];
            this.userList31 = _data['retList'];
            this.userList32 = _data['retList'];
            this.userList33 = _data['retList'];
            this.userList34 = _data['retList'];
            this.userList35 = _data['retList'];
            this.userList36 = _data['retList'];
            this.userList37 = _data['retList'];

        }, (error) => {
          this.loading = false;
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });

    this.data.detailList.forEach(detail => {
      if(detail.classesNo == "1" && detail.countNo == 1) {
        let opList11 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList11.push(op);
        });
        this.formModel['userList11'] = opList11.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.countNo == 1) {
        let opList21 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList21.push(op);
        });
        this.formModel['userList21'] = opList21.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.countNo == 1) {
        let opList31 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList31.push(op);
        });
        this.formModel['userList31'] = opList31.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.countNo == 2) {
        let opList12 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList12.push(op);
        });
        this.formModel['userList12'] = opList12.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.countNo == 2) {
        let opList22 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList22.push(op);
        });
        this.formModel['userList22'] = opList22.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.countNo == 2) {
        let opList32 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList32.push(op);
        });
        this.formModel['userList32'] = opList32.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.countNo == 3) {
        let opList13 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList13.push(op);
        });
        this.formModel['userList13'] = opList13.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.countNo == 3) {
        let opList23 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList23.push(op);
        });
        this.formModel['userList23'] = opList23.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.countNo == 3) {
        let opList33 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList33.push(op);
        });
        this.formModel['userList33'] = opList33.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.countNo == 4) {
        let opList14 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList14.push(op);
        });
        this.formModel['userList14'] = opList14.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.countNo == 4) {
        let opList24 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList24.push(op);
        });
        this.formModel['userList24'] = opList24.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.countNo == 4) {
        let opList34 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList34.push(op);
        });
        this.formModel['userList34'] = opList34.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.countNo == 5) {
        let opList15 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList15.push(op);
        });
        this.formModel['userList15'] = opList15.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.countNo == 5) {
        let opList25 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList25.push(op);
        });
        this.formModel['userList25'] = opList25.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.countNo == 5) {
        let opList35 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList35.push(op);
        });
        this.formModel['userList35'] = opList35.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.countNo == 6) {
        let opList16 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList16.push(op);
        });
        this.formModel['userList16'] = opList16.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.countNo == 6) {
        let opList26 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList26.push(op);
        });
        this.formModel['userList26'] = opList26.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.countNo == 6) {
        let opList36 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList36.push(op);
        });
        this.formModel['userList36'] = opList36.map(item =>item.userName);
      }else if(detail.classesNo == "1" && detail.countNo == 7) {
        let opList17 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList17.push(op);
        });
        this.formModel['userList17'] = opList17.map(item =>item.userName);
      }else if(detail.classesNo == "2" && detail.countNo == 7) {
        let opList27 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList27.push(op);
        });
        this.formModel['userList27'] = opList27.map(item =>item.userName);
      }else if(detail.classesNo == "3" && detail.countNo == 7) {
        let opList37 = [];
        detail.opList.forEach(element => {
          let op = {"userName" : element.opNo, "name" : "nihao"};
          opList37.push(op);
        });
        this.formModel['userList37'] = opList37.map(item =>item.userName);
      }


    });

  }

  openSure() {
    const params: any = {};
    params['mouldName'] = this.data.mouldName;
    params['orgNo'] = this.data.orgNo;
    params['mouldType'] = this.data.mouldType;
    params['postNo'] = this.data.postNo;
    params['mouldNo'] = this.data.mouldNo;

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
      }

    ];

    this.service.modPostMould(params).subscribe(_data => {
          this.loading = false;
          this.message.success(`成功！`);
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
