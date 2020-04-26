import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import {
  MapOptions, Point, MarkerOptions, NavigationControlOptions, ControlAnchor,
  NavigationControlType, OverviewMapControlOptions, ScaleControlOptions
} from 'angular2-baidu-map';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AppService } from 'app/app.service';
import { SessionService } from '@core/session.service';
import { LineDistanceService } from '../line-distance.service';
import * as _ from 'lodash';

@Component({
  templateUrl: 'line-distance-link.html'
})

export class LineDistanceLinkComponent implements OnInit, OnDestroy {
  dataType;
  loading = false;
  loading_init = false;
  clrCenterList = [];
  devList = [];
  unarrivePointList = [];
  mapPoint = [];
  arriveNum;
  unarriveNum;
  percentage: number;
  cover = false;
  linkPathstatus;
  allPathCount: number;
  allNotPathCount: number;
  clrCenter: any;
  public opts: MapOptions;
  public markers: Array<{ point: Point; options?: MarkerOptions }>;
  mapOptions: MapOptions = {
    centerAndZoom: {
      lat: 37.878392,
      lng: 112.557482,
      zoom: 11
    },
    enableScrollWheelZoom: true
  };
  centerPoint = {
    lat: 37.878392,
    lng: 112.557482,
  };
  controlOpts: NavigationControlOptions;
  overviewmapOpts: OverviewMapControlOptions;
  scaleOpts: ScaleControlOptions;
  timeJob;

  constructor(
    private app: AppService,
    private session: SessionService,
    private confirmServ: NzModalService,
    private service: LineDistanceService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // this.app.checkMapEnable();
    this.getClrCenterList();

    this.controlOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
    };
    this.overviewmapOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT,
      isOpen: true
    };
    this.scaleOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
    };
  }

  // 查询金库列表
  getClrCenterList() {
    this.loading_init = true;
    const params = { orgNo: this.session.orgNo };
    this.service.getClrCenterList(params)
      .subscribe(_data => {
        this.clrCenterList = _data.retList;
        this.clrCenter = this.clrCenterList[0];
        this.resetMap(this.clrCenterList[0]);
      });
  }

  // 查询金库所属所有网点机构
  getDevsByClrNo() {

    this.devList = [];
    const params = { clrCenterNo: this.clrCenter.clrCenterNo };
    this.service.getDevsByClrNo(params)
      .subscribe(
        _data => {
          this.loading_init = false;
          _data.retList.forEach(data => {
            if (data.x === 0 || data.x === -1 || !data.x || data.y === 0 || data.y === -1 || !data.y) {
              this.unarrivePointList.push(data);
            } else {
              this.devList.push(data);
            }
          });
          this.devList = this.devList.slice(0);
          this.unarrivePointList = this.unarrivePointList.slice(0);
          console.log(this.devList);
          this.arriveNum = this.devList.length;
          this.unarriveNum = this.unarrivePointList.length;
          this.getMarkers();
        },
        error => {
          this.loading_init = false;
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });
    this.getPathLinked();
  }

  // 百度地图设置中心点
  resetMap(clrCenter) {
    if (this.timeJob) {
      window.clearTimeout(this.timeJob);
    }
    this.loading_init = true;
    this.mapOptions = {
      centerAndZoom: {
        lat: this.centerPoint.lat,
        lng: this.centerPoint.lng,
        zoom: 12
      },
      enableScrollWheelZoom: true
    };

    this.mapPoint = [];

    // 添加金库位置图标
    this.mapPoint.push({
      options: {
        icon: {
          imageUrl: 'assets/images/pages/addnotes/icon_2.png',
          size: {
            height: 45,
            width: 38
          }
        },
        offset: new window.BMap.Size(-10, -30)
      },
      point: {
        lat: this.centerPoint.lat,
        lng: this.centerPoint.lng,
      },
      name: clrCenter.centerName,
      address: clrCenter.address || ''
    });

    this.getDevsByClrNo();
  }

  getMarkers() {
    //同一位置的设备进行分组
    const xgroup: any = _.groupBy(this.devList, 'x');
    for (const i in xgroup) {
      const xyGroup = _.groupBy(xgroup[i], 'y');
      for (const j in xyGroup) {
        const message = {
          point: {
            lng: i,
            lat: j
          },
          name: _.map(xyGroup[j], 'no').join(' | '),
          address: xyGroup[j][0].address
        };
        try {
          if (message['point']['x'] == this.mapPoint[0]['point']['x'] && message['point']['y'] == this.mapPoint[0]['point']['y']) {
            this.mapPoint.push(message);
          }
        } catch (error) {

        }

      }
    }
  }

  // 百度地图弹出框显示
  showWindow({ e, marker, map }: any, item): void {
    map.openInfoWindow(
      new window.BMap.InfoWindow(item.address, {
        offset: new window.BMap.Size(0, -20),
        title: item.name
      }),
      marker.getPosition()
    );
  }

  getPathLinked() {
    const params = {
      clrCenterNo: this.clrCenter.clrCenterNo,
      dataType : this.dataType
    };
    const _that = this;
    this.service.getPathLinked(params)
      .subscribe(_data => {
        this.allPathCount = 0;
        // this.allNotPathCount = parseInt(_data.pathNoLinkedCount);
        // this.linkPathstatus = _data.status;
        _data.retList.forEach(data => {
          if (data.type == 0) {
            this.allPathCount = data.pathCount;
          }
          // this.allPathCount += parseInt(data.pathCount);
          // this.allNotPathCount += parseInt(data.pathNoLinkedCount);
        });
        this.allNotPathCount = this.arriveNum * (this.arriveNum + 1) - this.allPathCount;
        this.percentage = Math.floor((this.allPathCount / (this.arriveNum * (this.arriveNum + 1))) * 100);
        if (this.percentage > 100) this.percentage = 100;

        this.timeJob = window.setTimeout(() => {
          if (this.linkPathstatus === 0) {
            _that.loading = false;
            return;
          }
          this.getPathLinked();
        }, 2000);
      });
  }

  clickLinkPath() {
    let customer;
    this.dataType == 1 ? customer = '设备' : customer = '网点';
    this.confirmServ.confirm({
      nzContent: '<b>' + customer + '关联将消耗较多服务器计算资源、网络通讯资源和地图秘钥配额</b>',
      nzOkText: '是，继续关联',
      nzZIndex: 2000,
      nzOnOk: () => {
        this.LinkPath();
      },
      nzOnCancel() {
      }
    });
  }

  // 点击关联时，进行网点关联，并且进行关联状态查询
  LinkPath() {
    this.loading = true;
    const params = {
      clrCenterNo: this.clrCenter.clrCenterNo,
      cover: this.cover ? 1 : 0,
      tactic: 11,
      dataType: this.dataType
    };
    this.service.linkPath(params)
      .subscribe(
        _data => this.getPathLinked(),
        error => {
          this.loading = false;
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });
  }

  loading_group = false;
  group() {
    this.loading_group = true;
    this.service.group({clrCenterNo: this.clrCenter.clrCenterNo}).subscribe(
      data => {
        this.loading_group = false;
        this.message.success(data.retMsg);
      },
      error => {
        this.loading_group = false;
        if (error instanceof HttpResponse) {
          this.message.warning(error.body.retMsg);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.timeJob) {
      window.clearTimeout(this.timeJob);
    }
  }

}
