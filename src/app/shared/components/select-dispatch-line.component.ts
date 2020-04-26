import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';

/**
 * @name 加钞线路选择组件
 * @example <select-dispatch-line name="lineNo" [(ngModel)]="formModel['lineNo']" lineType="0"></select-dispatch-line>
 * @description lineType:线路类型 0-ATM加钞路线 1-网点加钞路线 2-上门收款 3-紧急加钞路线 不填则查询所有
 * @export
 * @class SelectDispatchLineComponent
 * @implements {ControlValueAccessor, OnInit}
 */
@Component({
  selector: 'select-dispatch-line',
  template: `
      <nz-select [(ngModel)]="lineNo" (ngModelChange)="valueChange($event)" [nzPlaceHolder]="prompt"
                 [nzSize]="'default'"
                 nzAllowClear>
          <nz-option
                  *ngFor="let option of lines"
                  [nzLabel]="option.lineName"
                  [nzValue]="option.lineNo">
              <ng-template #nzOptionTemplate>
                  <nz-tooltip [nzTitle]="option.lineName" nzMouseEnterDelay="0.5">
                      <span nz-tooltip>{{option.lineName}}</span>
                  </nz-tooltip>
              </ng-template>
          </nz-option>
      </nz-select>
  `,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDispatchLineComponent),
      multi: true,
    },
  ],
})

export class SelectDispatchLineComponent implements ControlValueAccessor, OnInit {
  lineNo;
  url = environment.SERVICE_URL;
  @Input() prompt = '请选择线路';
  @Input() lineType = '';
  lines = [];
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;

  constructor(private message: NzMessageService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  @Input()
  set clrCenterNo(no: string) {
    this.lines = [];
    this.lineNo = null;
    this.onChange(null);
    if (!no) return;
    const params = {
      clrCenterNo: no,
      lineType: this.lineType
    };
    this.http.get(`${this.url}line-center/v2/networkLine/lineType`, { params: params })
      .subscribe(_data => {
        this.lines = _data['retList'];
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  writeValue(value: any) {
    this.lineNo = value;
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  valueChange(value) {
    this.onChange(value);
  }
}
