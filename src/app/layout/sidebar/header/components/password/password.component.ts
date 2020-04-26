import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {SessionService} from '@core/session.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '@env/environment';
import {Md5} from 'ts-md5';

@Component({
    templateUrl: './password.html'
})
export class PasswordComponent implements OnInit {
    validateForm: FormGroup;
    loading = false;
    name;

    constructor(private session: SessionService,
                private fb: FormBuilder,
                private nzMessage: NzMessageService,
                private router: Router,
                private http: HttpClient,
                private nzModalRef: NzModalRef,
    ) {

    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name: [{value: this.session.userName, disabled: true}, [Validators.required]],
            oldPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required, Validators.minLength(5)]],
            repeatNewPassword: [null, [Validators.required, this.confirmationValidator]],
        });

    }

    updateConfirmValidator() {
        /** wait for refresh value */
        setTimeout(_ => {
            this.validateForm.controls['repeatNewPassword'].updateValueAndValidity();
        });
    }

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
            password: Md5.hashStr(this.validateForm.controls.oldPassword.value+ 'messi').toString(),
            newPassword: Md5.hashStr(this.validateForm.controls.newPassword.value+ 'messi').toString()
        };

        this.loading = true;
        this.http.post(`${environment.SERVICE_URL}` + 'user-center/v2/user/password', params)
            .subscribe(data => {
                this.loading = false;
                this.nzMessage.success('密码修改成功，请重新登录');
                this.session.logout();
              this.nzModalRef.triggerOk();
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.nzMessage.error(error.body.retMsg);
                }
            });


    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return {required: true};
        } else if (control.value !== this.validateForm.controls['newPassword'].value) {
            return {confirm: true, error: true};
        }
    } ;

    resetForm(evt: MouseEvent) {
        evt.preventDefault();       // TODO: 为什么第二个按钮还会触发提交事件？？
        this.validateForm.reset({
            name: this.session.userName
        });
    }

}
