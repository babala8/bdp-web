import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ATMLineArrangeService } from '../atm-line-arrange.service';

declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;

function clickMarker(marker: any, org: any) {
    marker.addEventListener('click', function () {       // 对每一个点绑定click事件
        const infoWindow = new BMap.InfoWindow(`<div>${org.orgAddress}</div>`);       // 创建信息窗口对象
        infoWindow.setTitle(`<b>${org.orgName}</b>`);
        marker.openInfoWindow(infoWindow);  // 开启信息窗口
    });
}

@Component({
    templateUrl: 'atm-line-arrange-dev-map.html',
})
export class ATMLineArrangeDevMapComponent implements OnInit {
    lineData;
    addnotesPlanNo;
    groupNo;
    pointsView = [];
    BMap: any;

    @ViewChild('bmap') elem: ElementRef;
    map;
    mapPoint = [];
    routeList = [];
    constructor(private service: ATMLineArrangeService) {
    }

    ngOnInit() {
        this.map = new BMap.Map(this.elem.nativeElement, {enableMapClick: true});
        this.map.enableScrollWheelZoom();
        this.getPlanRoute();
    }

    getPlanRoute() {
        return this.service.getLineRunMapRoute({
            devList: this.lineData.devListArr
        }).subscribe(_data => {
            if (_data.element.routeList && _data.element.routeList.length) {
                this.routeList = _data.element.routeList;
                this.routeList[this.routeList.length - 1].endOrgName = this.routeList[0].startOrgName;
                let centralPoint;
                const ployPoints = [],
                    markPoints = [];

                this.routeList.forEach((value, index) => {

                    const point = new BMap.Point(value.startPointX, value.startPointY);

                    if (index === 0) {
                        centralPoint = point;
                        ployPoints.push(point);
                        markPoints.push({
                            org: {
                                orgName: `金库名称：${value.startOrgName}`,
                                orgAddress: `金库地址：${value.address}`,
                            },
                            point: point
                        });
                    } else {
                        ployPoints.push(point);
                        markPoints.push({
                            org: {
                                orgName: `设备编号：${value.startDevNo}`,
                                orgAddress: `网点名称：${value.startOrgName}<br>网点地址：${value.address}`,
                            },
                            point: point
                        });
                    }
                });
                this.map.centerAndZoom(centralPoint, 13);   // 初始化地图
                this.buildMarkers(markPoints);
                // 使得线成回路
                ployPoints.push(centralPoint);
                this.drawPloy(ployPoints, centralPoint);
            }
        });

    }

    // 显示折线
    drawPloy(pointList, centralPoint) {

        const driving = new BMap.DrivingRoute(centralPoint, {
            onSearchComplete: (results: any) => {
                if (driving.getStatus() === BMAP_STATUS_SUCCESS) {
                    const plan = driving.getResults().getPlan(0),
                        pts = plan.getRoute(0).getPath(),  // 通过驾车实例，获得一系列点的数组
                        polyline = new BMap.Polyline(pts, {
                            strokeColor: 'blue',
                            strokeWeight: 4,
                            strokeOpacity: 0.5
                        });
                    this.map.addOverlay(polyline);
                }
            }
        });

        const len = pointList.length;
        for (let i = 0, j = 1; i < len - 1 && j < len; i++, j++) {
            driving.search(pointList[i], pointList[j]);
        }
    }

    buildMarkers(pointList: Array<any>) {

        const netIcon = new BMap.Icon('assets/images/pages/addnotes/icon01.png', new BMap.Size(30, 30)),
            vaultIcon = new BMap.Icon('assets/images/pages/addnotes/icon_2.png', new BMap.Size(30, 30));

        let marker;

        pointList.forEach((value, index) => {
            const point = value.point,
                org = value.org;
            this.pointsView.push(point);
            if (index === 0) {
                marker = new BMap.Marker(point, {
                    enableMassClear: false,
                    title: '点击可查看详情',
                    icon: vaultIcon,
                });
            } else {
                marker = new BMap.Marker(point, {
                    enableMassClear: false,
                    title: '点击可查看详情',
                    icon: netIcon
                });
                const template = `<span style="right: auto;left: -7px;background-color: #d7605c;
                                color: #FFF; padding: 0 4px;font-family: Tahoma;
                                cursor: pointer;border-radius: 7px;position: absolute;
                                top: 5px;font-size: 11px;">
                                <b >${index}</b>
                          </span>`;
                const label = new BMap.Label(template, {offset: new BMap.Size(20, -10)});
                marker.setLabel(label);
            }

            clickMarker(marker, org);

            this.map.addOverlay(marker);

            this.map.setViewport(this.pointsView); // 将所有位置显示在最佳视野里
        });
    }

}
