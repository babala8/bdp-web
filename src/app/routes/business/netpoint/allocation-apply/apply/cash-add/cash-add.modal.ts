import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'cash-add.modal.html',
    styles: [`
        input, nz-input-number {
            border-radius: 0;
        }
    `]
})

export class CashAddComponent implements OnInit {
    transferCurrencyTypeDTOS = [];
    cashbox = [];
    amountSame;
    beforeChange: number = 0;
    afterChange: number = 0;
    cashClass = [
        {
            currencyType: 1,
            name: '完成券',
            denomination: [
                {type: 1, name: '100元', amount: null},
                {type: 2, name: '50元', amount: null},
                {type: 3, name: '20元', amount: null},
                {type: 4, name: '10元', amount: null},
                {type: 5, name: '5元', amount: null},
                {type: 6, name: '2元', amount: null},
                {type: 7, name: '纸1元', amount: null},
                {type: 8, name: '硬1元', amount: null},
                {type: 9, name: '纸5角', amount: null},
                {type: 10, name: '硬5角', amount: null},
                {type: 11, name: '纸1角', amount: null},
                {type: 12, name: '硬1角', amount: null},
                {type: 13, name: '纪念币', amount: null}
            ]
        },
        {
            currencyType: 3,
            name: '破损券',
            denomination: [
                {type: 1, name: '100元', amount: null},
                {type: 2, name: '50元', amount: null},
                {type: 3, name: '20元', amount: null},
                {type: 4, name: '10元', amount: null},
                {type: 5, name: '5元', amount: null},
                {type: 6, name: '2元', amount: null},
                {type: 7, name: '纸1元', amount: null},
                {type: 8, name: '硬1元', amount: null},
                {type: 9, name: '纸5角', amount: null},
                {type: 10, name: '硬5角', amount: null},
                {type: 11, name: '纸1角', amount: null},
                {type: 12, name: '硬1角', amount: null},
                {type: 13, name: '纪念币', amount: null}
            ]
        },
    ];
    constructor(private modalRef: NzModalRef,
                private message: NzMessageService) { }

    ngOnInit() {
        console.log(this.transferCurrencyTypeDTOS)
        this.transferCurrencyTypeDTOS.forEach(dto => {
            this.beforeChange += parseInt(dto.amount)
        })
        this.cashClass.forEach(item => {
            item.denomination.forEach(denomination => {
                this.transferCurrencyTypeDTOS.forEach(dto => {
                    if (dto.currencyType === item.name && dto.denomination === denomination.name) {
                        denomination.amount = dto.amount;
                    }
                });
            });
        })
     }

    handleOk() {
        this.afterChange = 0
        this.transferCurrencyTypeDTOS = [];
        this.cashClass.forEach(item => {
            item.denomination.forEach(denomination => {
                if (!!denomination.amount) {
                    this.afterChange += parseInt(denomination.amount)
                    this.transferCurrencyTypeDTOS.push({
                        currencyType: item.name,
                        currencyCode: '人民币',
                        denomination: denomination.name,
                        amount: denomination.amount
                    });

                    const detail = {
                        amount: denomination.amount,
                        direction: 1,
                        productNo: 'X0001',
                        detailList: [
                          {
                            key: 'currencyType',
                            name: '币种',
                            value: item.name
                          },{
                            key: 'currencyCode',
                            name: '钞币类别',
                            value: '人民币'
                          },{
                            key: 'denomination',
                            name: '面值',
                            value: denomination.name
                          }
                        ]
                    }

                    this.cashbox.push(detail);
                }
            });
        })
        console.log(this.afterChange ,this.beforeChange)
        if(!!this.amountSame && this.afterChange != this.beforeChange){
            // 比较修改先后一致性
            this.message.error(`修改后金额总数不可改变！`,);
            return
        }
        this.modalRef.triggerOk();
    }

    handleCancel() {
        this.modalRef.triggerCancel();
    }
}
