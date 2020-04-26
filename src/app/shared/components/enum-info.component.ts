import { SYS_CONS } from './../../models/constant';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-enum-info',
  template: `
        <ng-container *ngFor="let item of enums">
            <ng-container *ngIf="item.value == value">{{item.name||item.label}}</ng-container>
        </ng-container>
    `
})

export class EnumInfoComponent implements OnInit {
  @Input() value;
  enums = [];
  constructor() { }

  ngOnInit() { }

  @Input()
  set type(type) {
    this.enums = SYS_CONS[type] || [];
  }
}
