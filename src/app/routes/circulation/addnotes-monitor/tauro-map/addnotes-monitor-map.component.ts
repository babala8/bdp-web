import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CirculationService } from '../../circulation.service';
import * as addMinutes from 'date-fns/add_minutes';
declare const BMap: any;
declare const BMAP_ANIMATION_BOUNCE: any;
declare const BMAP_STATUS_SUCCESS: any;

function clickMarker(marker: any, info: any) {
  marker.addEventListener('click', function () {       // 对每一个点绑定click事件
    const infoWindow = new BMap.InfoWindow(`<div>${info.con}</div>`);       // 创建信息窗口对象
    infoWindow.setTitle(`<b>${info.info}</b>`);
    marker.openInfoWindow(infoWindow);  // 开启信息窗口
  });
}

@Component({
  selector: 'app-addnotes-monitor-map.detail',
  templateUrl: './addnotes-monitor-map.component.html',
  styles:[`
    .BMap_shadow img{
        max-width: none;
    }
  `]
})

export class AddnotesMonitorMapComponent implements OnInit {

  @ViewChild('map') element: ElementRef;
  dataParams;
  pointsView = [];
  map;
  detailList;
  mapPoint = [];
  routeList = [];
  actRouteList = [];
  devList = [];
  devStatusList = [
    {name: '已配钞', value: 1},
    {name: '已签收', value: 2},
    {name: '已回收', value: 3},
    {name: '已清点', value: 4},
  ];

  constructor(
    private service: CirculationService,
  ) { }

  ngOnInit() {
    this.map = new BMap.Map(this.element.nativeElement, { enableMapClick: true });
    this.map.enableScrollWheelZoom();
    this.getCentrlInfo();
  }

  // 获取金库位置,初始化地图
  getCentrlInfo() {
    this.service.getClrCenterByClrNo( this.dataParams.clrCenterNo)
      .subscribe(_data => {
        const centralPoint = new BMap.Point(_data.element.x, _data.element.y),
          markPoints = [];
        markPoints.push({
          info: {
            info: '金库：' + _data.element.centerName,
            con: '名称：' + _data.element.bankOrgName,
          },
          type: 'vault',
          point: centralPoint,
        });
        this.map.centerAndZoom(centralPoint, 13);   // 初始化地图
        this.buildMarkers(markPoints);
        // 添加点
        this.getPlanGroupRoute();
        this.getDispatchDevRoute();
        this.getActReaderRoute();
      })
  }

  // 获取计划规划路线
  getPlanGroupRoute() {
    return this.service.getPlanGroupRoute({
      addnotesPlanNo: this.dataParams.addnotesPlanNo,
      groupNo: this.dataParams.lineNo,
      tactic: 11
    }).subscribe(_data => {

      if (_data.element.routeList.length) {

        this.routeList = _data.element.routeList;

        let centralPoint;
        const ployPoints = [];

        this.routeList.forEach((value, index) => {

          const point = new BMap.Point(value.startPointX, value.startPointY);
          if (index === 0) {
            centralPoint = point;
          }
          ployPoints.push(point);
        });

        // 使得线成回路
        ployPoints.push(centralPoint);

        this.drawPloy(ployPoints, centralPoint, 'blue');
      }
    });

  }

  // 获取加钞人员路线
  getActReaderRoute() {
    return this.service.getPlanReaderRoute(this.dataParams.taskNo).subscribe(_data => {
      console.log(_data);
      this.detailList = [
        {
          name: '任务单编号',
          value: this.dataParams.taskNo,
        },
        {
          name: '加钞日期',
          value: this.dataParams.addnotesDate,
        }
      ];

      if (_data.retList.length) {
        this.actRouteList = _data.retList;
        let centralPoint;
        const ployPoints = [], markPoints = [];

        this.actRouteList.forEach((value, index) => {

          const point = new BMap.Point(value.x, value.y);

          if (index === 0) {
            markPoints.push({
              info: {
                info: '人员：' + value.userName,
                con: '更新时间：' + value.rdDate + ' ' + value.rdTime,
              },
              type: 'location',
              point: point,
            });
          } else if (index === this.actRouteList.length - 1) {
            centralPoint = point;
          }
          ployPoints.push(point);
        });
        this.drawPloy(ployPoints, centralPoint, 'red');
        this.buildMarkers(markPoints);
      }

    });
  }

  // 获取加钞单设备信息
  getDispatchDevRoute() {
    return this.service.getDispatchDev(this.dataParams.taskNo).subscribe(_data => {
      if (_data.customerInfoDTOList.length) {
        this.devList = _data.customerInfoDTOList;
        const devPoints = [];
        this.devList.forEach((value, index) => {
          const point = new BMap.Point(value.positionX, value.positionY);
          let conf = `加钞状态：${value.status === 1 ? '未加钞' : '已加钞'}<br>
                      设备地址：${value.address}<br>`;
          value.planArriveTime = new Date().format('YYYY-MM-DD HH:mm:ss');
          const planArriveTime = new Date(value.planArriveTime.replace(/-/g,'/'));
          if (value.status !== 1) {
            const stopTime = parseInt(10 + Math.random() * 20 + '', 10),
                  realArriveTime = addMinutes(planArriveTime, Math.random() * 10),
                  leaveTime = addMinutes(realArriveTime, stopTime);
            conf += `实际到达时间：${realArriveTime.format('HH:mm')}<br>
                    驶离时间：${leaveTime.format('HH:mm')}<br>
                    停留时间：${stopTime}分钟`;
          }
          devPoints.push({
            info: {
              info: `设备编号：${value.customerNo}<br>
                    加钞顺序：${value.sortNo}<br>
                    计划到达时间：${planArriveTime.format('HH:mm')}<br>`,
              con: conf,
            },
            point: point,
            type: 'dev',
            status: value.status,
          });
        });
        this.buildMarkers(devPoints);
      }
    });
  }


  drawPloy(pointList, centralPoint, color) {

    const driving = new BMap.DrivingRoute(centralPoint, {
      onSearchComplete: (results: any) => {
        if (driving.getStatus() === BMAP_STATUS_SUCCESS) {
          const plan = driving.getResults().getPlan(0),
            pts = plan.getRoute(0).getPath(),  // 通过驾车实例，获得一系列点的数组
            polyline = new BMap.Polyline(pts, {
              strokeColor: color,
              strokeWeight: 4,
              strokeOpacity: 0.5,
            });

          this.map.addOverlay(polyline);
        }
      },
    });

    const len = pointList.length;
    for (let i = 0, j = 1; i < len - 1 && j < len; i++ , j++) {
      driving.search(pointList[i], pointList[j]);
    }
  }

  // 标记添加
  buildMarkers(pointList: Array<any>) {
    const localtionIcon = new BMap.Icon('assets/images/pages/addnotes/icon01.png', new BMap.Size(30, 30)),
      vaultIcon = new BMap.Icon('assets/images/pages/addnotes/icon_2.png', new BMap.Size(30, 30)),
      devAddedIcon = new BMap.Icon('assets/images/pages/addnotes/blue-ATM-icon.png', new BMap.Size(30, 30)),
      devIcon = new BMap.Icon('assets/images/pages/addnotes/gray-ATM-icon.png', new BMap.Size(30, 30));
    let marker;
    pointList.forEach((value, index) => {
      const point = value.point,
        info = value.info;
      this.pointsView.push(point);
      switch (value.type) {
        case 'vault':
          marker = new BMap.Marker(point, {
            enableMassClear: false,
            title: '点击可查看详情',
            icon: vaultIcon,
          });
          break;
        case 'location':
          marker = new BMap.Marker(point, {
            enableMassClear: false,
            title: '点击可查看详情',
            icon: localtionIcon,
          });
          marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          break;
        case 'dev':
          if (value.status <= 1) {
            marker = new BMap.Marker(point, {
              enableMassClear: false,
              title: '点击可查看详情',
              icon: devIcon,
            });
          } else {
            marker = new BMap.Marker(point, {
              enableMassClear: false,
              title: '点击可查看详情',
              icon: devAddedIcon,
            });
          };
          break;
        default:
          console.log("未知点");
      }
      clickMarker(marker, info);
      this.map.addOverlay(marker);
    });
    this.map.setViewport(this.pointsView); // 将所有位置显示在最佳视野里
  }


}
