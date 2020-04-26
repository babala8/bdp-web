import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { GeneralManagementService } from "../../general-management.service";
import { CommonService } from 'app/routes/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: './armoredCar-add-mutiple.html',
})
export class ArmoredCarAddMutipleComponent implements OnInit {
  ngFileModel: any = {};
  file;
  loading = false;
  constructor(private armoredCarService: GeneralManagementService,
    private _common: CommonService,
    private message: NzMessageService,
    private nzModal: NzModalRef,
  ) {
  }

  ngOnInit() {
  }

  readFile(e) {
    this.file = e;
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.ngFileModel = {
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        data: event.target['result']
      };
    };
    reader.readAsDataURL(file);
  }

  save() {
    if (!this.file) {
      this.message.warning('请选择上传文件');
      return;
    }
    const data = new FormData();
    data.append('file', this.file.target.files[0]);
    // console.log(params);
    this.loading = true;
    this.armoredCarService.addCarMutiple(data)
      .subscribe(result => {
        console.log(result);
        this.message.success('添加成功');
        this.nzModal.triggerOk();
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }
  downloadTemplate() {
    this._common.downloadTemplate("Car.xls", "车辆数据批量导入模板", (err) => {
      this.message.error('模板下载失败');
    });
  }
}
