import { Component, OnInit } from '@angular/core';
import { MapOptions, Point, MarkerOptions } from 'angular2-baidu-map';
import * as _ from 'lodash';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { OrderManageService } from '../orderManage.service';

@Component({
  templateUrl: 'distributeLine.component.html'
})

export class DistributeLineComponent implements OnInit {
  task;
  groupList;
  // arrangeInfo; // 网点线路排班生成成功后的信息
  loading = false;
  vaultPoint: any;
  addForm = {};
  isConfirmLoading = false;
  clrCenterList = [];
  devList = [];
  mapPoint = [];
  lineList = [];
  formModel: {
    lineNo? : string,
    sortNo? : string,
  } = {};
  retList;
  percentage: number;
  cover = false;
  clrCenter: any;
  clrCenterInfo = {
    clrCenterNo: null,
    clrCenterName: null,
    X: null,
    Y: null
  };
  public opts: MapOptions;
  public markers: Array<{ point: Point; options?: MarkerOptions }>;
  mapOptions: MapOptions = {
    centerAndZoom: {
      lat: 37.876772,
      lng: 112.556052,
      zoom: 10
    },
    enableScrollWheelZoom: true
  };

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
    private orderManageService: OrderManageService
  ) {
  }

 ngOnInit() {
    this.distributeLine();
    this.getLineList();
   // this.clrCenterInfo = this.arrangeInfo.clrCenter;
   // this.checkMapEnable();
   // this.getAllNetPointsOnLine();
   // this.getClrCenterPoint();
 }


  // 百度地图弹出框显示
  showWindow({ e, marker, map }: any, iitem, isDev = false): void {
    console.log(iitem);
    if (isDev) {
      map.openInfoWindow(
        new window.BMap.InfoWindow(`网点地址：${iitem.name}`, {
          offset: new window.BMap.Size(5, 5),
          title: `网点编号：${iitem.no}`
        }),
        marker.getPosition()
      );
    } else {
      map.openInfoWindow(
        new window.BMap.InfoWindow(iitem.name, {
          offset: new window.BMap.Size(5, 5),
          title: `${iitem.no}`
        }),
        marker.getPosition()
      );
    }

  }

  //  显示当前分组数Label图标
  markerLoaded(index, marker: any) {
    const template = `<span style="right: auto;left: -7px;background-color: #d7605c;
                                color: #FFF; padding: 0 4px;font-family: Tahoma;
                                cursor: pointer;border-radius: 7px;position: absolute;
                                top: 5px;font-size: 11px;">
                                <b >${index}</b>
                          </span>`;
    marker.setLabel(new (<any>window.BMap).Label(template, {
      offset: new (<any>window.BMap).Size(0, -10)
    }));
  }

  /*
   * 网点线路排班生成后获取各线路上所有的网点信息
   */
/*
  getAllNetPointsOnLine() {

    this.groupList = this.arrangeInfo['routeList'];
    for(let i = 0; i < this.groupList.length; i++) {
      const groupList: any = [];
      if (this.groupList[i]['routeList'].length > 0) {
        this.groupList[i]['routeList'].forEach( d => {
          d.showNo = i+1;
          groupList.push(d);
        });
      }
      this.getMarkers(groupList);
    }
  }
*/

  checkMapEnable() {
    try {
      BMap;
    } catch (error) {
      setTimeout(() => {
        this.modal.create({
          nzTitle: '提示',
          nzContent: '百度地图不可用，请下载配置文件点击运行，并刷新当前页面！',
          nzZIndex: 9999,
          nzClosable: true,
          nzOkText: '下载',
          nzMaskClosable: true,
          nzOnOk: () => {
            this.downloadFile({ fileID: 'id10001' });
          }
        });
      }, 0);
    }
  }

  downloadFile(params) {
    try {
      let elemIF = document.createElement('iframe'), queryStr = '';
      for (let key in params) {
        queryStr += key + '=' + params[key] + '&';
      }
      elemIF.src = DOWNLOAD_URL + '/basic/fileService/download?' + queryStr;
      elemIF.style.display = 'none';
      document.body.appendChild(elemIF);
    } catch (e) {
      this.message.error('文件下载异常！');
    }
  }

  // 得到金库位置
  getClrCenterPoint() {
    this.mapOptions = {
      centerAndZoom: {
        lat: this.clrCenterInfo.Y,
        lng: this.clrCenterInfo.X,
        zoom: 13
      },
      enableScrollWheelZoom: true
    };
    this.vaultPoint = {
      options: {
        icon: {
          imageUrl: 'assets/images/pages/addnotes/icon_2.png',
          size: {
            height: 60,
            width: 50
          }
        }
      },
      point: {
        lat: this.clrCenterInfo.Y,
        lng:this.clrCenterInfo.X,
      },
      no: `金库编号：${this.clrCenterInfo.clrCenterNo}`,
      name: `金库名称：${this.clrCenterInfo.clrCenterName}`,
    };
    // this.vaultPoint.setViewport(this.mapPoint); // 将所有位置显示在最佳视野里
  }

  // 整合所有网点数据
  getMarkers(allGroupList) {
    const xgroup: any = _.groupBy(allGroupList, 'X');
    for (const i in xgroup) {
      const xyGroup = _.groupBy(xgroup[i], 'Y');
      for (let j in xyGroup) {
        const point = {
          lng: i,
          lat: j
        };
        const message: any = {
          options: {
            icon: {
              imageUrl: 'assets/images/pages/addnotes/icon01.png',
              size: {
                height: 60,
                width: 50
              }
            }
          },
          'point': point,
          no: xyGroup[j][0].orgNo,
          name: xyGroup[j][0].orgAddress,
          showNo: xyGroup[j][0].showNo
        };
        this.mapPoint.push(message);
      }
    }
  }

  // 获取线路
  getLineList() {
    this.orderManageService.qryLineNoByDate({date: this.task.planFinishDate})
      .subscribe(_data => {
        this.lineList = _data['retList'];
        console.log(this.lineList);
      });
  }


  // 自动分配线路
  distributeLine() {
  const params = {
    clrCenterNo: this.task.clrCenterNo,
    date: this.task.createTime,
    netWorkNo: this.task.customerNo,
    taskType: this.task.taskType,
  };
  this.orderManageService.distributeLine(params)
  }

  // 手动分配线路
  handleOk() {
    const params = {
      taskNo: this.task.taskNo,
      lineNo: this.formModel.lineNo,
      sortNo: '1'
    };

    this.orderManageService.distributeLines(params).subscribe(
      res => {
        this.message.success(res.retMsg);
        this.modalRef.triggerOk();
      },
      () => this.isConfirmLoading = false
    );

  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }


}
