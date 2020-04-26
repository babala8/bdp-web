import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../../channel-center.service';


@Component({
    templateUrl: './customer-info-modify.html',
    styles: [`
        form>div {
            padding: 8px 0;
        }
    `]
})

export class CustomerInfoModifyComponent implements OnInit {
    validateForm: FormGroup;
    callCustomer;
    loading = false;
  callCustomerTypes = [{'label':'上门客户','value':'1'},{'label':'人民银行','value':'2'},{'label':'金交所','value':'3'},{'label':'同业客户','value':'4'},{'label':'合作单位','value':'5'}];

  constructor(private fb: FormBuilder,
                private nzModal: NzModalRef,
                private message: NzMessageService,
                private service: ChannelCenterService) {
    }

    ngOnInit(): void {
        this.qryAllLine();
        this.validateForm = this.fb.group({
            customerNo: [{ value: this.callCustomer.customerNo, disabled: false }, [Validators.required]],
            customerShortName: [{ value: this.callCustomer.customerShortName, disabled: false }, [Validators.required, Validators.maxLength(20)]],
            address: [{ value: this.callCustomer.address, disabled: false }, [Validators.required, Validators.maxLength(100)]],
            location: [{ value: this.callCustomer.location, disabled: false }, [Validators.required, Validators.maxLength(100)]],
            x: [{ value: this.callCustomer.x, disabled: false }, [Validators.required, Validators.pattern('^(\\-|\\+)?(((\\d|[1-9]\\d|1[0-7]\\d|0{1,3})\\.\\d{0,6})|(\\d|[1-9]\\d|1[0-7]\\d|0{1,3})|180\\.0{0,6}|180)$')]],
            y: [{ value: this.callCustomer.y, disabled: false }, [Validators.required, Validators.pattern('^(\\-|\\+)?([0-8]?\\d{1}\\.\\d{0,6}|90\\.0{0,6}|[0-8]?\\d{1}|90)$')]],
            isOneself: [{ value: this.callCustomer.isOneself, disabled: false }, [Validators.required]],
            customerNumber: [{ value: this.callCustomer.customerNumber, disabled: true }, [Validators.required]],
            cnCustomerLongName: [{ value: this.callCustomer.cnCustomerLongName, disabled: false }, [Validators.required, Validators.maxLength(100)]],
            customerAuthPhone: [{ value: this.callCustomer.customerAuthPhone, disabled: false }, [Validators.maxLength(11)]],
            customerManage: [{ value: this.callCustomer.customerManage, disabled: false }, [Validators.required]],
            touchPhoneOne: [{ value: this.callCustomer.touchPhoneOne, disabled: false }, [Validators.pattern('[0-9-()（）]{7,18}')]],
            touchPhoneTwo: [{ value: this.callCustomer.touchPhoneTwo, disabled: false }, [Validators.pattern('[0-9-()（）]{7,18}')]],
            callCustomerLine: [{ value: this.callCustomer.callCustomerLine, disabled: false }, [Validators.required]],
            callClrPeriod: [{ value: this.callCustomer.callClrPeriod , disabled: false }, [Validators.required]],
          callCustomerType: [{ value: this.callCustomer.callCustomerType , disabled: false }, Validators.required],


            // maxAddClrPeriod: [{value: this.devInfo.maxAddClrPeriod,disabled:true}, [Validators.required]],
        });
    }

    isOneselfs = [{'label':'是','value':'1'},{'label':'否','value':'0'}]
    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }

        if (this.validateForm.invalid) {
            return;
        }

        const params = {
          customerNo: this.callCustomer.customerNo,
            customerShortName: this.validateForm.controls.customerShortName.value,
            address: this.validateForm.controls.address.value,
            location: this.validateForm.controls.location.value,
            x: this.validateForm.controls.x.value,
            y: this.validateForm.controls.y.value,
            isOneself: this.validateForm.controls.isOneself.value,
            customerNumber: this.validateForm.controls.customerNumber.value,
            cnCustomerLongName: this.validateForm.controls.cnCustomerLongName.value,
            customerAuthPhone: this.validateForm.controls.customerAuthPhone.value,
            customerManage: this.validateForm.controls.customerManage.value,
            touchPhoneOne: this.validateForm.controls.touchPhoneOne.value,
            touchPhoneTwo: this.validateForm.controls.touchPhoneTwo.value,
            callClrPeriod: this.validateForm.controls.callClrPeriod.value,
        };
        console.log(params);
        this.service.modCallCustomers(params)
            .subscribe(data => {
                console.log(data);
                this.message.success(data['retMsg']);
                this.nzModal.triggerOk();
            },(error) => {
                this.message.error(error.body.retMsg);
                this.nzModal.destroy('NzOnCancel');
            });
    }

    lines = [];
    qryAllLine() {
        this.lines = [];
        // this.validateForm.controls.addnotesLine.setValue(null);
        this.service.qryAllLine({"lineType":2})
            .subscribe(_data => {
                this.lines = _data.retList;
            });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
