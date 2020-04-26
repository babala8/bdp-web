import { SYS_CONS } from './../../models/constant';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';

/**
 * @name 所属金库选择组件
 * @example <select-clr-center name="clrCenterNo" [(ngModel)]="formModel['clrCenterNo']" [allowClear]="true"></select-clr-center>
 * @export
 * @class SelectClrCenterComponent
 * @implements {ControlValueAccessor, OnInit}
 */
@Component({
  selector: 'select-clr-center',
  template: `
    <nz-select [(ngModel)]="clrCenterNo" (ngModelChange)="valueChange($event)" [nzPlaceHolder]="'请选择金库'"
               [nzSize]="'default'" style="width: 100%;" [nzDisabled]="disabled" [nzAllowClear]="allowClear">
      <nz-option *ngFor="let option of clrCenterList" [nzLabel]="option.centerName"
                 [nzValue]="option.clrCenterNo">
        <ng-template #nzOptionTemplate>
          <nz-tooltip [nzTitle]="option.centerName" [nzMouseEnterDelay]="0.5">
            <span nz-tooltip>{{option.centerName}}</span>
          </nz-tooltip>
        </ng-template>
      </nz-option>
    </nz-select>
  `,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectClrCenterComponent),
      multi: true,
    },
  ],
})

export class SelectClrCenterComponent implements ControlValueAccessor, OnInit {
  clrCenterNo;
  url = environment.SERVICE_URL;
  private _prompt = '请选择金库';
  private _allowClear = false;
  private _defaultSelect = false;
  private _disabled = false;
  // @Output('ngModelChange') clrCenterNoChange:EventEmitter<String> = new EventEmitter<String>();
  clrCenterList = [];
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;

  constructor(
    private http: HttpClient,
    private message: NzMessageService) {
  }

  ngOnInit() {
    this.http.get(this.url + 'channel-center/v2/clrCenter', {
      params: { clrCenterType: SYS_CONS.CENTER_TYPES[0].no + '' }
    })
      .subscribe(_data => {
        this.clrCenterList = _data['retList'];
        if (!!this._defaultSelect) {
          const clrCenterNo = this.clrCenterList.length > 0 ? this.clrCenterList[0]['clrCenterNo'] : '';
          this.writeValue(clrCenterNo);
          this.valueChange(clrCenterNo);
        }
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  @Input()
  set prompt(value: string) {
    this._prompt = value;
  }

  get prompt() {
    return this._prompt;
  }

  @Input()
  set allowClear(value: boolean) {
    this._allowClear = value;
  }

  get allowClear() {
    return this._allowClear;
  }

  @Input()
  set defaultSelect(value: boolean) {
    this._defaultSelect = value;
  }

  get defaultSelect() {
    return this._defaultSelect;
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }

  get disabled() {
    return this._disabled;
  }

  writeValue(value: any) {
    this.clrCenterNo = value;
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
