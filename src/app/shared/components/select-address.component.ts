import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzModalRef, NzMessageService, NzModalService } from 'ng-zorro-antd';

/**
 * @author xiaozhao
 * @example <select-address [point]="point" [type]="type"></select-address>
 * @export
 * @class SelectAddressComponent
 * @implements {OnInit}
 * @description point和type都是必须参数 point：{pointX:'',pointY:'',address:'',}; enum<type>{'add','mod'}
 */
@Component({
  selector: 'select-address',
  template: `
    <div nz-row>
      <div nz-col [nzSpan]="10">
        <input nz-input nzSize="large" (keyup.enter)="addressSearch()" placeholder="请输入地址查询或点击地图选择地址"
               [(ngModel)]="point.address">
      </div>
      <div nz-col [nzOffset]="1" [nzSpan]="6">
        <button nz-button [nzSize]="'large'" (click)="addressSearch()">
          <span>查询</span>
        </button>
        <button nz-button style="margin-left: 20px" [nzSize]="'large'" [nzType]="'primary'" (click)="pointConfirm()">
          <span>确定</span>
        </button>
      </div>
      <div nz-col [nzSpan]="4" nzOffset="1">
        <input nz-input nzSize="large" placeholder="经纬度" [ngModel]="point.pointX+(point.pointX?', ':'')+point.pointY"
               readonly>
      </div>
    </div>
    <div nz-row style="margin-top: 10px">
      <div nz-col [nzSpan]="10">
        <nz-select [(ngModel)]="point.city" style="width: 88px" (ngModelChange)="tagChange($event)"
                   [nzPlaceHolder]="'更换城市'">
          <nz-option *ngFor="let city of cities" [nzLabel]="city" [nzValue]="city"></nz-option>
        </nz-select>
      </div>
    </div>
    <div nz-row>

      <div nz-col [nzSpan]="24" style="height: 500px">

        <div #bmap style="height: 100%;width: 100%;"></div>
      </div>
    </div>
  `,
})

export class SelectAddressComponent implements OnInit {
  map;
  // cities = CITIES['shanxi'];
  cities = ['成都'];
  point;
  @ViewChild('bmap') elem: ElementRef;
  netIcon;

  constructor(
    private nzSub: NzModalRef,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  ngOnInit() {
    this.checkMapEnable();
    this.map = new BMap.Map(this.elem.nativeElement, { enableMapClick: true });
    this.netIcon = new BMap.Icon('assets/images/pages/addnotes/icon01.png', new BMap.Size(30, 30));

    if (!!this.point.city) {
      this.point.city = this.cities[0];
    }
    const point = new BMap.Point(this.point.pointX || 104.071187, this.point.pointY || 30.664787);
    this.map.centerAndZoom(point, 12);
    this.map.enableScrollWheelZoom();
    this.map.setMinZoom(11);
    this.map.addOverlay(new BMap.Marker(point, {
      icon: this.netIcon,
    }));
    this.pointListener();
  }

  tagChange(city) {
    this.map.centerAndZoom(city, 12);
  }

  pointListener() {
    const that = this,
      geoc = new BMap.Geocoder();
    this.map.addEventListener('click', (e) => {
      const pt = e.point;
      geoc.getLocation(pt, (rs) => {
        const city = rs.addressComponents.city.slice(0, -1);
        if (that.cities.indexOf(city) === -1) {
          that.message.warning('地址超出指定范围！');
          return;
        }
        that.point.pointX = pt.lng;
        that.point.pointY = pt.lat;

        that.map.clearOverlays();
        that.map.addOverlay(new BMap.Marker(pt, {
          icon: that.netIcon,
        }));
        that.point.address = rs.address;
        that.point.city = rs.addressComponents.city.slice(0, -1);
      });
    });
  }

  pointConfirm() {
    if (this.point.pointX === '' || this.point.pointX === '') {
      this.message.error('没有经纬度信息，请重新选择');
      return;
    }
    this.nzSub.triggerOk();
  }

  addressSearch() {
    if (this.point.address === '') {
      this.message.error('请先输入一个地址');
    }
    const myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(this.point.address, (pt) => {
      this.map.clearOverlays();
      if (pt) {
        this.point.pointX = pt.lng;
        this.point.pointY = pt.lat;
        this.map.centerAndZoom(pt, 18);
        this.map.addOverlay(new BMap.Marker(pt, {
          icon: this.netIcon,
        }));
        myGeo.getLocation(pt, (rs) => {
          this.point.city = rs.addressComponents.city;
        });
      } else {
        this.message.error('您选择的地址没有解析到结果');
      }
    });
  }

  checkMapEnable() {
    try {
      BMap;
    } catch (error) {
      setTimeout(() => {
        this.modal.create({
          nzTitle: '提示',
          nzContent: '百度地图不可用，请下载配置文件点击运行，并刷新当前页面！',
          nzZIndex: 9999,
          nzClosable: true,
          nzOkText: '下载',
          nzMaskClosable: true,
          nzOnOk: () => {
            this.downloadFile({ fileID: 'id10001' });
          },
        });
      }, 0);
    }
  }

  downloadFile(params) {
    try {
      const elemIF = document.createElement('iframe');
      let queryStr = '';
      for (const key in params) {
        queryStr += key + '=' + params[key] + '&';
      }
      elemIF.src = DOWNLOAD_URL + '/basic/fileService/download?' + queryStr;
      elemIF.style.display = 'none';
      document.body.appendChild(elemIF);
    } catch (e) {
      this.message.error('文件下载异常！');
    }
  }

}
