import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { TaskListComponent } from './component/task-list.component';
import { ClearCenterService } from '../clear-center.service';

@Component({
    templateUrl: './sorter-monitor.component.html',
    styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `],
})
export class SorterMonitorComponent implements OnInit {
    loading = false;
    formModel = {};
    options = [];
    //page = new Page();
    dataList = [];


    constructor(
      private nzModal:NzModalService,
      private service:ClearCenterService,
      private message:NzMessageService,
    ) {
    }

    ngOnInit() {
        this.refreshData(true);

    }

    refreshData(reset = false) {
        if (reset) {
            // this.page.curPage = 1;
        }
        this.loading = true;
        const params = _.extend({}, {
            clrCenterNo:this.formModel['clrCenterNo'] || '',
            devNo:this.formModel['devNo'] || '',
        });

        console.log(params);
        this.service.qryDevCountStatus(params)
            .subscribe(_data => {
                console.log(_data);
                this.loading = false;
                //this.page.totalRow = _data['totalRow'];
                this.dataList = _data['retList'];
                this.dataList.forEach(data => {
                    console.log(data);
                    this.options.push({
                        title: {
                            text: '任务执行状况',
                            x: 'center',
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)',
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['正在执行', '等待执行', '已完成'],
                        },
                        series: [
                            {
                                name: '任务单编号',
                                type: 'pie',
                                radius: '48%',
                                center: ['50%', '60%'],
                                data: [
                                    { value: data.queueList.length, name: '等待执行', data: data.queueList,devNo:data.devNo},
                                    { value: data.doingList.length, name: '正在执行', data: data.doingList,devNo:data.devNo},
                                    { value: data.doneList.length, name: '已完成', data: data.doneList,devNo:data.devNo},
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    },
                                },
                            },
                        ],
                    });
                });
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
                }
            });
    }

    onClickChart(e) {
        console.log(e);
        this.nzModal.create({
            nzTitle: `${e.data.name}任务列表（清分机编号：${e.data.devNo}）`,
            nzMaskClosable: false,
            nzFooter: null,
            nzWidth: 1000,
            nzClassName: 'zj-modal',
            nzContent: TaskListComponent,
            nzComponentParams: {
                devList: e.data.data,
                devNo: e.data.devNo
            },
            nzOnOk: () => {
            },
            nzOnCancel: () => {
            },
        });
    }
}
