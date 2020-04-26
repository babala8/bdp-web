import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'detail-table',
  template: `
    <div nz-row class="detail-table">
        <ng-container *ngFor="let item of data">
            <div nz-col [nzSpan]="itemWidth">
                <nz-tooltip [nzTitle]="item.name">
                <ellipsis nz-tooltip lines="1" style="max-width: 200px;white-space: nowrap;text-overflow: ellipsis;display: inline-block" [ngStyle]="item.style || {}">{{item.name}}:</ellipsis>
            </nz-tooltip>
            </div>
            <div nz-col [nzSpan]="itemWidth">
                <nz-tooltip [nzTitle]="item.value">
                    <ellipsis nz-tooltip lines="1" style="max-width: 200px;white-space: nowrap;text-overflow: ellipsis;display: inline-block" [ngStyle]="item.style || {}">{{item.value}}</ellipsis>
                </nz-tooltip>
            </div>
        </ng-container>
        <ng-content></ng-content>
    </div>
    `
})

export class DetailTableComponent implements OnInit {
  @Input() data = [];

  @Input() itemWidth = 3;
  constructor() { }

  ngOnInit() { }
}