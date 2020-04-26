import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'exception-401',
  template: `<zijin-exception type="401" style="min-height: 500px; height: 80%;"></zijin-exception>`,
})
export class Exception401Component implements OnInit {

  constructor(private modalSrv: NzModalService) { }

  ngOnInit() {
    this.modalSrv.closeAll();
  }
}
