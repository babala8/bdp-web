import { Component, OnInit, Input } from '@angular/core';
/**
 * @author liangzy
 * @example <single-line [content]="data.clrCenterName"></single-line>
 * @export
 * @class SingleLineComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'single-line',
  template: `
        <nz-tooltip [nzTitle]=" tooltip || content" nzMouseEnterDelay="0.5">
            <ellipsis nz-tooltip lines="1" [ngStyle]="width">{{content}}</ellipsis>
        </nz-tooltip>
    `
})

export class SingleLineComponent implements OnInit {

  @Input() content;
  @Input() tooltip;
  _width;
  constructor() { }

  ngOnInit() { }

  @Input()
  set width(value) {
    this._width = value;
  }

  get width() {
    if (!!this._width) {
      return {
        "max-width": this._width
      }
    }
    return {};
  }
}