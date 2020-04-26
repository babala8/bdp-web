import {Component, OnInit} from '@angular/core';
import {NzModalService, NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {AddnotesPlanService} from '../../../addnotes-plan.service';
import { MapOptions } from 'angular2-baidu-map';

@Component({
    templateUrl: 'group-router.html',
})
export class GroupRouterComponent implements OnInit {

    addnotesPlanNo;
    groups;
    datas = [];
    vaultPoint: any;
    mapPoint = [];
    mapOptions: MapOptions = {
        centerAndZoom: {
            lat: 30.2640250631,
            lng: 10.1883762993,
            zoom: 10
        },
        enableScrollWheelZoom: true
    };

    constructor(private service: AddnotesPlanService) { }

    ngOnInit() {
        this.getAllGroupQry();
        this.getClrCenterNoofPlan();
    }

    // 得到所有分组网点
    getAllGroupQry() {

        for (const i in this.groups) {

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
                this.datas.push(data);
                _data.element['netPointsGroup'].forEach(d => {
                    d.groupNo = this.groups[i];
                    d.showNo = parseInt(i) + 1;
                    groupList.push(d);
                });
                console.log(groupList);
                this.getMarkers(groupList);
            });
        }
    }

    // 得到金库位置
    getClrCenterNoofPlan() {
        const params = {addnotesPlanNo: this.addnotesPlanNo};

        this.service.detail(params).subscribe(_data => {
            console.log(_data.element.addnotesPlan.clrCenterNo);

            const params1 = {clrCenterNo: _data.element.addnotesPlan.clrCenterNo};

            this.service.getClrCenterByClrNo( _data.element.addnotesPlan.clrCenterNo)
                .subscribe(_data1 => {

                    this.mapOptions = {
                        centerAndZoom: {
                            lat: _data1.element.y,
                            lng: _data1.element.x,
                            zoom: 10
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
                        no: '金库',
                        name: _data1.element.centerName,
                    };
                });
        });
        // this.vaultPoint.setViewport(this.mapPoint); // 将所有位置显示在最佳视野里
    }

    // 整合所有网点数据
    getMarkers(allGroupList) {
        allGroupList.forEach(data => {
            const point = {
                lng: data.x,
                lat: data.y,
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
                no: data.orgName,
                name: data.address,
                showNo: data.showNo
            };

            this.mapPoint.push(message);

            console.log(this.mapPoint);
        });
    }

    // 百度地图弹出框显示
    showWindow({e, marker, map}: any, iitem): void {
        map.openInfoWindow(
            new window.BMap.InfoWindow(iitem.name, {
                offset: new window.BMap.Size(0, -30),
                title: iitem.no
            }),
            marker.getPosition()
        );
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
            offset: new (<any>window.BMap).Size(20, -10)
        }));
    }


}
