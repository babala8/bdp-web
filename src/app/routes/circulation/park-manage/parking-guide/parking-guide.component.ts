import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from '@core/websocket.service';
import { Subscription } from 'rxjs';
import { ParkManageService } from '../park-manage.service';

@Component({
  templateUrl: './parking-guide.component.html',
})
export class ParkingGuideComponent implements OnDestroy {
  // parkingCarList = [];
  wsObservable: Subscription;
  loading = false;

  constructor(private ws: WebsocketService, private cd: ChangeDetectorRef, private ParkManageService : ParkManageService) {

    this.wsObservable = this.ws.change.subscribe(data => {
      console.log("parkingGuide:"+data);

        if(data.type === "enterType") {
           for(let i = 0;i < this.cameraList[1].carList.length;i++) {
              if(data.parkingCarNo === this.cameraList[1].carList[i].parkingCarNo) {
                this.cameraList[1].carList.splice(i,1);
                this.cameraList[2].carList.push(data);
              }
           }
           this.newEnterCar = data;
          //  this.enterCarList = this.cameraList[2].carList;
          //  this.callOutCarList = this.cameraList[1].carList;
           this.enterCarList = [...this.cameraList[2].carList];
           this.callOutCarList = [...this.cameraList[1].carList];
           this.enterCarList.sort(this.sequenceByType);
           this.callOutCarList.sort(this.sequenceByType);

          //music
          let musicUrl = "././././assets/mp3/";
          let audio = new Audio();
          audio.style.visibility = "hidden";
          document.body.appendChild(audio);
          if (audio != null){//data.parkingCarNo.splice(3,5)
            audio.src = musicUrl + (data.parkingCarNo + "").substring(3) + "enter.mp3";
            console.log("src:"+audio.src);
            audio.autoplay = true;
            audio.controls = true;

          }
          setTimeout(function () {
              audio.pause();
              document.body.removeChild(audio);
          }, 8000);

          this.enterFlag = true;

           console.log(this.enterCarList);
           console.log(this.callOutCarList);
           this.cd.detectChanges();

        }else if(data.type === "leaveType") {
           for(let i = 0;i < this.cameraList[2].carList.length;i++) {
            if(data.parkingCarNo === this.cameraList[2].carList[i].parkingCarNo) {
              this.cameraList[2].carList.splice(i,1,data);
              // this.cameraList[0].carList.push(data);
            }
           }
          //  this.enterCarList = this.cameraList[2].carList;
           this.enterCarList = [...this.cameraList[2].carList];
           this.enterCarList.sort(this.sequenceByType);

          let musicUrl = "././././assets/mp3/";
          let audio = new Audio();
          audio.style.visibility = "hidden";
          document.body.appendChild(audio);
          if (audio != null){//data.parkingCarNo.splice(3,5)
            audio.src = musicUrl + (data.parkingCarNo + "").substring(3) + "leave.mp3";
            console.log("src:"+audio.src);
            audio.autoplay = true;
            audio.controls = true;

          }
          setTimeout(function () {
              audio.pause();
              document.body.removeChild(audio);
          }, 8000);


           console.log(this.enterCarList);
           this.callOut();
           this.cd.detectChanges();
        }

    });

    this.timer = setInterval(() => {
      //此处为需要定时执行的方法，2000为间隔的时间，单位是毫秒
      let _this = this;
      let date = new Date();
      let minutes;
      if((date.getMinutes() + "").length === 1) {
        minutes = "0" + (date.getMinutes() + "");
      }else {
        minutes = (date.getMinutes() + "");
      }

      let seconds;
      if((date.getSeconds() + "").length === 1) {
        seconds = "0" + (date.getSeconds() + "");
      }else {
        seconds = (date.getSeconds() + "");
      }
      _this.promptMessage.hms = date.getHours() + '：' + minutes + "：" + seconds;
      // _this.promptMessage.hms = date.getHours() + '：' + date.getMinutes() + "：" + date.getSeconds();
      let y =  date.getFullYear();
      let m =  date.getUTCMonth()+1;
      let d =  date.getDate();
      _this.promptMessage.date = y+'年'+ m + '月' + d + '日';
      _this.promptMessage.day = _this.transform(y+'-'+ m + '-' + d) + "";

      let enterCarNum = 0;
      for(let i = 0;i < this.cameraList[2].carList.length;i++) {
        if(this.cameraList[2].carList[i].parkingCarType === '1') {
          enterCarNum++;
        }
      }
      this.countMessage.notConnect = this.cameraList[0].carList.length;
      this.countMessage.finshConnect = this.cameraList[2].carList.length - enterCarNum;
      this.countMessage.connectIng = enterCarNum + this.cameraList[1].carList.length;
    },1000);
  }

  transform(value: any): any {
    if (value !== undefined) {
        let weekArray = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
        let myDate = new Date(value);
        let week = weekArray[myDate.getDay()];
        return week;
    }
  }

  timer;//定时器
  newEnterCar = {};
  newCallCar = {};
  enterFlag = false;
  promptMessage = {"date":"2019年9月26号","hms":"08：00：11","day":"星期四"};
  countMessage = {"notConnect":16,"connectIng":0,"finshConnect":0};
  // audio: Audio;

  cameraList = [
		{
			type: '0',
			typeName: '未呼叫车辆',
			carList: [
				{parkingCarNo: '苏A 12345',lineName: 'A1线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12346',lineName: 'A2线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12347',lineName: 'A3线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12348',lineName: 'A4线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12349',lineName: 'A5线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12350',lineName: 'A6线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12351',lineName: 'A7线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
        {parkingCarNo: '苏A 12352',lineName: 'A8线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
        {parkingCarNo: '苏A 12353',lineName: 'A1线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12354',lineName: 'A2线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12355',lineName: 'A3线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12356',lineName: 'A4线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12357',lineName: 'A5线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12358',lineName: 'A6线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12359',lineName: 'A7线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
				{parkingCarNo: '苏A 12360',lineName: 'A8线',parkingCarLeaveDate: '',parkingCarEnterDate: '',location:0,type:'',parkingCarType:''},
			]
		},
		{
			type: '1',
			typeName: '呼叫车辆',
			carList: [

      ]
    },
    {
			type: '2',
			typeName: '签到车辆',
			carList: [

      ]
    }
  ];


  callOutCarList = [];
  enterCarList = [];
  callOutFlag = false;
  callOut() {
    console.log("jinru");
    let noCallOutCarNum = this.cameraList[1].carList.length;

    const numList = [1,2,3,4,5,6];

    let tempList = [];
    for(var j = 0;j < this.cameraList[1].carList.length;j++) {
      tempList.push(this.cameraList[1].carList[j]);
    }

    for(var j = 0;j < this.cameraList[2].carList.length;j++) {
      if(this.cameraList[2].carList[j].parkingCarType === '1') {
        tempList.push(this.cameraList[2].carList[j]);
      }
    }

    tempList.sort(this.sequenceByType);


    for(var j = 0;j < tempList.length;j++) {
      numList.splice(tempList[j].location-1,1,0);
    }

    let enterCarNum = 0;
    for(let i = 0;i < this.cameraList[2].carList.length;i++) {
       if(this.cameraList[2].carList[i].parkingCarType === '1') {
        enterCarNum++;
       }
    }

    const numList1 = [];
    for(var j = 0;j < numList.length;j++) {
        if(numList[j] !== 0) {
        numList1.push(numList[j]);
      }
    }


    let callAndenterCarNum = noCallOutCarNum + enterCarNum;
    let putCar = [];

    if(callAndenterCarNum < 6) {
       let callingCarNum = 6 - callAndenterCarNum;
       for(let i = 0;i < callingCarNum;i++) {
        if(i === callingCarNum - 1) {
            this.newCallCar = this.cameraList[0].carList[this.cameraList[0].carList.length - 1];
        }

         this.cameraList[0].carList[this.cameraList[0].carList.length - 1].location = numList1[i];
         this.cameraList[0].carList[this.cameraList[0].carList.length - 1].parkingCarType = '1';
         this.cameraList[1].carList.push(this.cameraList[0].carList[this.cameraList[0].carList.length - 1]);
         putCar.push(this.cameraList[0].carList[this.cameraList[0].carList.length - 1]);
         this.cameraList[0].carList.pop();

       }
       console.log(this.cameraList);
      // this.callOutCarList = this.cameraList[1].carList;
      this.callOutCarList = [...this.cameraList[1].carList];
      console.log(this.callOutCarList);
      const params = {ParkingGuideList:putCar,ParkingGuideType:"callOutType"};
      this.callOutFlag = true;
      this.ParkManageService.updateCarStatus(params).subscribe(
				data => {

				}
			)
    }
  }

  sequenceByType(a, b) {
    if (a.parkingCarType < b.parkingCarType) {
        return 1;
    } else if (a.parkingCarType > b.parkingCarType) {
        return -1;
    } else if (a.location > b.location) {
        return 1;
    } else if (a.location < b.location) {
        return -1;
    } else {
        return 0;
    }
  }

  ngOnDestroy() {
    if (this.timer) {
        clearInterval(this.timer);// 销毁定时器
    }
  }

}
