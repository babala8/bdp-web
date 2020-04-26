import { Component, OnInit } from '@angular/core';
import { AddnotesPlanService } from '../../../addnotes-plan.service';
import { MapOptions } from 'angular2-baidu-map';
import * as _ from 'lodash';
import { AppService } from 'app/app.service';

@Component({
    templateUrl: 'group-router.html',
})

export class GroupRouterComponent implements OnInit {

    addnotesPlanNo;
    groups;
    clrCenterNo;
    datas = [];
    vaultPoint: any;
    mapPoint = [];
    mapOptions: MapOptions = {
        centerAndZoom: {
            lat: 37.876772,
            lng: 112.556052,
            zoom: 10
        },
        enableScrollWheelZoom: true
    };

    constructor(private service: AddnotesPlanService, private app: AppService) { }

    ngOnInit() {
        // this.app.checkMapEnable();
        this.getAllGroupQry();
        this.getClrCenterNoofPlan();
    }

    getAllGroupQry() {
        for (let i = 0; i < this.groups.length; i++) {
            const params: any = {};
            const groupList: any = [];
            params['addnotesPlanNo'] = this.addnotesPlanNo;
            params['groupNo'] = this.groups[i];

            this.service.qryByNo(params).subscribe(_data => {
                const data = {};
                data['planNetPntCnt'] = _data.element['planNetPntCnt'];
                data['planDevCnt'] = _data.element['planDevCnt'];
                data['planDistance'] = _data.element['planDistance'];
                data['planTimeCost'] = _data.element['planTimeCost'];
                this.datas = this.datas.concat(data);
                _data.element['netPointsGroup'].forEach(d => {
                    d.groupNo = this.groups[i];
                    d.showNo = i + 1;
                    groupList.push(d);
                });
                this.getMarkers(groupList);
            });
        }
    }

    // 得到金库位置
    getClrCenterNoofPlan() {
        this.service.getClrCenterByClrNo(this.clrCenterNo)
            .subscribe(_data1 => {
                this.mapOptions = {
                    centerAndZoom: {
                        lat: _data1.element.y,
                        lng: _data1.element.x,
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
                        lat: _data1.element.y,
                        lng: _data1.element.x,
                    },
                    no: _data1.element.centerName,
                    name: '',
                };
            });
    }

    // 整合所有网点数据
    getMarkers(allGroupList) {
        const xgroup: any = _.groupBy(allGroupList, 'x');
        for (const i in xgroup) {
            const xyGroup = _.groupBy(xgroup[i], 'y');
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
                    no: xyGroup[j][0].devNo,
                    name: xyGroup[j][0].address,
                    showNo: xyGroup[j][0].showNo
                };
                this.mapPoint.push(message);
            };
        }
    }

    // 百度地图弹出框显示
    showWindow({ e, marker, map }: any, iitem, isDev = false): void {
        console.log(iitem);
        if (isDev) {
            map.openInfoWindow(
                new window.BMap.InfoWindow(`设备地址：${iitem.name}`, {
                    offset: new window.BMap.Size(5, 5),
                    title: `设备编号：${iitem.no}`
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


}
