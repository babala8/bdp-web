import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'org-tree',
  template: `
    <nz-input-group [nzAddOnAfter]="ICON" [nzSize]="size"
                    nz-popover [nzContent]="nzTemplate" nzTrigger="click" [(nzVisible)]="_visible"
                    nzPlacement="bottomLeft">
      <input [nzSize]="size" nz-input
             [readOnly]="true"
             [ngModel]="value"
             [id]="zjId">
    </nz-input-group>
    <ng-template #ICON>
      <i type="appstore" nz-icon></i>
    </ng-template>


    <ng-template #nzTemplate>
      <div [ngStyle]="treeStyle">
        <nz-tree
          style="padding-top: 10px;"
          [nzData]="zjNodes"
          nzAsyncData
          (nzClick)="checked($event)"
          (nzExpandChange)="expland($event)">
        </nz-tree>
      </div>
    </ng-template>
  `,
  styles: [`
    .treeStyle {
    'height.px': 250,
    'min-width.px': 250,
    'overflow': 'hidden',
    'margin-left.px': - 16,
    'margin-right.px': - 16,
    'padding-bottom.px': 20,
    }

    }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrgTreeComponent),
      multi: true,
    },
  ],
})

export class OrgTreeComponent implements OnInit, ControlValueAccessor {
  zjNodes;
  _visible;
  @Input() zjId;
  @Input() size;
  treeStyle = {
    'height.px': 300,
    'min-width.px': 250,
    position: 'relative',
    'overflow-y': 'scroll',
    'margin-left.px': -16,
    'margin-right.px': -16,
    'padding-bottom.px': 20,
  };
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;
  private _value = {
    no: null,
    name: null,
  };

  constructor(private _http: HttpClient) {
  }

  get value() {
    return this._value.name || '';
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  checked(evt: any, fifter: string) {
    this.value = {
      no: evt.node.key,
      name: evt.node.title,
    };
    this._visible = false;
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  expland(event: Required<NzFormatEmitEvent>): void {
    // load child async
    if (event.eventName === 'expand') {
      const node = event.node;
      if (node && node.getChildren().length === 0 && node.isExpanded) {
        this.loadNode(event.node.key).then(data => {
          node.addChildren(data);
        });
      }
    }
  }

  loadNode(id): Promise<NzTreeNodeOptions[]> {
    return this._http.get(`${environment.SERVICE_URL}` + 'channel-center/v2/org/children', { params: { parentOrgNo: id } }).pipe(map(data => {
      const childrenArray = this.buildTree(data['retList'], 'no', 'name', 'parentOrgNo', 'key', 'title', 'children', 'isLeaf');
      return childrenArray;
    })).toPromise();
  }

  ngOnInit(): void {
    this._http.get(`${environment.SERVICE_URL}` + 'channel-center/v2/org/children').subscribe(_data => {
      this.zjNodes = this.buildTree(_data['retList'], 'no', 'name', 'parentOrgNo', 'key', 'title', 'children', 'isLeaf');
    });
  }

  buildTree(srcArr: Array<any>, srcKey: string, srcText: string,
    parentKey: string, targetKey: string, targetText: string, childrenKey: string, hasChildren: string): Array<any> {

    const totalMap = {}, retArr = [];

    let item, newItem, parentNode;

    for (let index = 0, length = srcArr.length; index < length; index++) {
      item = srcArr[index];
      newItem = {};
      newItem[targetKey] = item[srcKey];
      newItem[targetText] = item[srcText];
      if (item[hasChildren]) {
        newItem[hasChildren] = true;
      } else {
        newItem[hasChildren] = false;
      }
      newItem.parentNo = item[parentKey];
      totalMap[item[srcKey]] = newItem;
    }
    for (let iterator in totalMap) {
      if (!totalMap[iterator]) {
        return;
      } else {
        iterator = totalMap[iterator];
        if (iterator['parentNo']) {
          if (!!(parentNode = totalMap[(iterator['parentNo'])])) {
            parentNode[childrenKey] = parentNode[childrenKey] || [];
            parentNode[childrenKey].push(iterator);
            delete iterator['parentNo'];
          } else {
            retArr.push(iterator);
          }
        } else {
          delete iterator['parentNo'];
          retArr.push(iterator);
        }
      }

    }
    return retArr;
  }
}
