import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as _ from 'lodash';


@Component({
  selector: 'tab-alt',
  template: `

    <div style="background: #ECECEC;padding:30px;user-select:none;">
      <div nz-row [nzGutter]="8">
        <div nz-col [nzSpan]="8" *ngFor="let card of alternatives;">
          <nz-card (click)="selectTab(card)">
            <div>
              <i nz-icon type="check-circle" theme="fill"
                 style="color: blueviolet;font-size: 22px;position: absolute;right: 7px;top:4px;"
                 *ngIf="card.selected"></i>
              <i nz-icon type="check-circle" theme="outline" *ngIf="!card.selected"
                 style="position: absolute;right: 7px;top:5px;"></i>
              <i style="font-size: 45px;" [type]="card.icon" nz-icon theme="fill"></i>
              <div style="font-size: 18px;font-weight: bold;">{{card.name}}</div>
              <p>{{card.describe}}</p>
            </div>
          </nz-card>
        </div>
      </div>
    </div>


  `,
  styles: [`
    nz-card {
      width: 99%;
      height: 150px;
      overflow: hidden;
      cursor: pointer;
      background-color: #8bd22f;
    }

  `]
})
export class TabAlternativesComponent implements OnInit {


  @Input() alts;  // 所有项
  @Input() index; // 当前打开的tab在HomeComponent.tabs的索引HomeComponent.tabs[index.1][index.0]
  @Output() tabSelect = new EventEmitter<any>();
  alternatives = []; // 扩展了selected属性的所有可供选择项

  constructor() {
  }


  ngOnInit(): void {
    if (this.alts) {
      this.alts.forEach(val => {
        val.icon = val.icon || 'anticon-pie-chart';
        this.alternatives.push(_.extend({selected: false}, val));
      });
    }
    console.log('alternatives:', this.alternatives);
  }

  selectTab(tab) {
    this.alternatives.forEach(value => {
      value.selected = false;
    });
    tab.selected = true;
    this.tabSelect.emit({
      index: this.index,
      tab: _.omit(tab, ['selected'])
    });
  }

}



