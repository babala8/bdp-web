import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
    templateUrl: 'bag-inventory-check.html'
})

export class BagInventoryCheckComponent implements OnInit {
    task;
    cashboxList;
    detailList = [];
    constructor(private modalRef: NzModalRef) { }

    ngOnInit() {
        this.detailList = [
            { name: '任务单编号', value: this.task.taskNo },
            { name: '所属机构', value: this.task.customerName },
            { name: '解现日期', value: this.task.planFinishDate }
        ];
        this.cashboxList.forEach(cashbox => cashbox.isClear = false);
     }

    handleCancel() {
        this.modalRef.triggerCancel();
    }

    handleOk() {
        this.modalRef.triggerOk();
    }

    get hasCheckedItem() {
        return this.cashboxList.filter(item => item.checked).length > 0;
    }
}
