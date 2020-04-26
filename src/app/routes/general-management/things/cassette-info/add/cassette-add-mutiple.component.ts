import {Component, OnInit} from '@angular/core';
import { ThingsService } from "../../things.service";
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  templateUrl: 'cassette-add-mutiple.html',
})
export class CassetteAddMutipleComponent implements OnInit {
  ngFileModel: any = {};
  file;

  constructor(private cassetteInfoService: ThingsService,
              private message: NzMessageService,
              private nzModal: NzModalRef) {

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
    data.append('filename', this.file.target.files[0]);
    // console.log(params);
    this.cassetteInfoService.addContainer(data)
      .subscribe(result => {
        console.log(result);
        this.message.success('添加成功');
        this.nzModal.triggerOk();
      });
    // // 判断参数集合是否都已输入
    // const flag = this.parameters.every((value => {
    //   if (value.name && value.value)
    //     return true;
    //   return false;
    // }));
    //
    // if (!(this.reportName && this.ngFileModel && this.groupName && flag)) {
    //   this.message.warning('校验未通过');
    //   return;
    // }
    //
    // const params = {
    //   reportName: this.reportName,
    //   reportFile: this.ngFileModel,
    //   groupName: this.groupName,
    //   parameters: this.parameters,
    //   creator: this.Session.getUserSession().name,
    //   orgNo: this.Session.getUserSession().orgNo
    // };
    // this.reportService.addReport(params)
    //   .subscribe(data => {
    //     this.nzModal.destroy();
    //     this.message.success(
    //       `新增成功！`
    //     );
    //   });
  }
}
