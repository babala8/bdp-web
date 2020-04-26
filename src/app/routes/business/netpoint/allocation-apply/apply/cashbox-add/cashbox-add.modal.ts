import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import * as addDays from 'date-fns/add_days';
import { SYS_CONS } from '../../../../../../models/constant';
import { NetPointService } from '../../../netpoint.service';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
    selector: 'app-cashbox-add-modal',
    templateUrl: 'cashbox-add.modal.html'
})

export class CashboxAddComponent implements OnInit {
    GOODS_TYPE = SYS_CONS.GOODS_TYPE;
    today = addDays(new Date(), 1);
    org;
    cashBoxList = [];
    cashbox:any = {
      containerType: this.GOODS_TYPE[0].value,
      entityNo: null,
      leafFlag: '1',
      outDate: addDays(new Date(), 1)
    };

    disabledDate = (current: Date): boolean => {
      return differenceInCalendarDays(current, this.today) < 0;
    };

    constructor(private modalRef: NzModalRef,
                private netPointService: NetPointService) { }

    ngOnInit() {
        this.netPointService.qryCashBoxListOfOrg(this.org.no).subscribe(
            result => this.cashBoxList = result.element
        );
     }

    handleCancel() {
        this.modalRef.destroy();
    }

    handleOk() {
        this.modalRef.triggerOk();
    }
}
