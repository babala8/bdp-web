import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddnotesPlanService} from '../../../addnotes-plan.service';
import { AppService } from 'app/app.service';

declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;

function clickMarker(marker: any, info: any) {
    marker.addEventListener('click', function () {       // 对每一个点绑定click事件
        const infoWindow = new BMap.InfoWindow(`<div>${info.info}</div>`);       // 创建信息窗口对象
        infoWindow.setTitle(`<b>${info.name}</b>`);
        marker.openInfoWindow(infoWindow);  // 开启信息窗口
    });
}

@Component({
    templateUrl: 'group-map.html',
})
export class GroupMapComponent implements OnInit {

    addnotesPlanNo;
    groupNo;
    pointsView = [];

    @ViewChild('bmap') elem: ElementRef;
    map;

    mapPoint = [];
    routeList = [];

    constructor(private service: AddnotesPlanService, private app: AppService) {

    }

    ngOnInit() {
        // this.app.checkMapEnable();
        this.map = new BMap.Map(this.elem.nativeElement, {enableMapClick: true});
        this.map.enableScrollWheelZoom();
        this.getPlanGroupRoute();
    }

    getPlanGroupRoute() {
        return this.service.getPlanGroupRoute({
            addnotesPlanNo: this.addnotesPlanNo,
            groupNo: this.groupNo,
            tactic: 11
        }).subscribe(_data => {

            if (_data.element.routeList.length) {

                this.routeList = _data.element.routeList;

                let centralPoint;
                const ployPoints = [],
                    markPoints = [];

                this.routeList.forEach((value, index) => {

                    const point = new BMap.Point(value.startPointX, value.startPointY);

                    if (index === 0) {
                        centralPoint = point;
                        markPoints.push({
                            info: {
                                name: `金库名称：${value.startOrgName}`,
                                info:  `金库地址：${value.startOrgAddress}`,
                            },
                            point: point
                        });
                    } else if (markPoints[markPoints.length - 1].point.lng == value.startPointX &&
                        markPoints[markPoints.length - 1].point.lat == value.startPointY) {
                        markPoints.push({
                            info: {
                                name: markPoints[markPoints.length - 1].info.name + '|' + value.startOrgNo,
                                info: `网点名称：${value.startOrgName} <br> 网点地址：${value.startOrgAddress}`,
                            },
                            point: point
                        });
                    } else {
                        markPoints.push({
                            info: {
                                name: `设备编号：${value.startOrgNo}`,
                                info: `网点名称：${value.startOrgName} <br> 网点地址：${value.startOrgAddress}`,
                            },
                            point: point
                        });
                    }
                    ployPoints.push(point);
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
        for (let i = 0, j = 1; i < len - 1 && j < len; i++ , j++) {
            driving.search(pointList[i], pointList[j]);
        }
    }

    buildMarkers(pointList: Array<any>) {

        const netIcon = new BMap.Icon('assets/images/pages/addnotes/icon01.png', new BMap.Size(30, 30)),
            vaultIcon = new BMap.Icon('assets/images/pages/addnotes/icon_2.png', new BMap.Size(30, 30));

        let marker;

        pointList.forEach((value, index) => {
            const point = value.point,
                info = value.info;
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

            clickMarker(marker, info);

            this.map.addOverlay(marker);

            this.map.setViewport(this.pointsView); // 将所有位置显示在最佳视野里
        });
    }

}
