import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {DASHBOARDSERVICE} from '../config';


@Component({
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="_submitForm()" class="style-form">
      <nz-form-item nz-row>
        <nz-form-label nz-col [nzSpan]="6" nzRequired>
          <label [attr.for]="'name'"
                 style="font-size: 13px;font-weight: bold;">主题名称</label>
        </nz-form-label>
        <nz-form-control nz-col [nzSpan]="12">
          <input nz-input [nzSize]="'large'" formControlName="name" id="name">
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row>
        <nz-form-label nz-col [nzSpan]="6" nzRequired>
          <label [attr.for]="'icon'"
                 style="font-size: 13px;font-weight: bold;">主题图标</label>
        </nz-form-label>
        <nz-form-control nz-col [nzSpan]="12">
          <nz-select formControlName="icon" [nzPlaceHolder]="''" [nzSize]="'large'" nzAllowClear
                     id="icon">
            <nz-option *ngFor="let option of themeIcons" [nzLabel]="option.label" [nzValue]="option.value">
              <ng-template #nzOptionTemplate>
                <i class="anticon" [ngClass]="'anticon-'+option.value"></i>
                {{option.label}}
              </ng-template>
            </nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row>
        <nz-form-label nz-col [nzSpan]="6" nzRequired>
          <label [attr.for]="'desc'"
                 style="font-size: 13px;font-weight: bold;">主题描述</label>
        </nz-form-label>
        <nz-form-control nz-col [nzSpan]="12">
          <input nz-input [nzSize]="'large'" formControlName="desc" id="desc">
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control nz-col [nzOffset]="11">
          <button nz-button [nzSize]="'large'" [nzType]="'primary'" [nzLoading]="loading">提交</button>
        </nz-form-control>
      </nz-form-item>
    </form>

  `
})
export class UserAddDashboardComponent implements OnInit {
  form: FormGroup;
  loading = false;

  themeIcons = [
    {value: 'area-chart', label: '区域图标'},
    {value: 'pie-chart', label: '扇形图标'},
    {value: 'bar-chart', label: '柱状图标'},
    {value: 'dot-chart', label: '散点图标'},
    {value: 'book', label: 'chrome'},
    {value: 'desktop', label: 'github'},
    {value: 'calendar', label: 'aliwangwang'}
  ];

  constructor(private fb: FormBuilder,
              private nzModal: NzModalRef,
              @Inject(DASHBOARDSERVICE) private ds,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      icon: [null, [Validators.required]],
    });
  }

  _submitForm() {
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty();
      }
    }
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.ds.addUserNewPageDef(this.form.value)
      .subscribe(data => {
        this.loading = false;
        this.nzModal.triggerOk();
        this.message.success('主题添加成功！');
      }, (err) => {
        this.loading = false;
        this.message.error(err.body.retMsg);
      });
  }
}

