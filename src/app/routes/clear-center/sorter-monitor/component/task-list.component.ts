import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';


@Component({
    templateUrl: './task-list.html',
    styles: [`
        .info-table {
            width: 100%;
            border: 1px solid #e8e8e8;
            text-align: center;
            margin-bottom: 10px;
        }

        .info-table td:first-child {
            white-space: nowrap;
        }

        .info-table td {
            border: 1px solid #e8e8e8;
            padding: 8px 10px;
        }
    `],
})

export class TaskListComponent implements OnInit {
    devList;
    devNo;
    detailList;
    productInfo =[
        {name:'自助机具加钞产品',no:1},
        {name:'网点解现&寄库产品',no:2},
        {name:'网点寄库领回产品',no:3},
        {name:'网点领现产品',no:4},
        {name:'现金调拨产品',no:5},
        {name:'测试产品添加',no:6}
    ]
    constructor(private fb: FormBuilder,
                private modalRef: NzModalRef,
                private message: NzMessageService ) {
    }

    ngOnInit(): void {
        let totalNum:number = 0;
        this.devList.forEach(data => {
            totalNum += Number(data.countAmount)
        });
        this.detailList = [
            {
                name: '设备编号',
                value: this.devNo
            },
            {
                name: '任务数量',
                value: this.devList.length
            },
            {
                name: '计划总金额',
                value: totalNum
            },
        ];
    }
    handleCancel() {
        this.modalRef.triggerCancel();
    }

}
