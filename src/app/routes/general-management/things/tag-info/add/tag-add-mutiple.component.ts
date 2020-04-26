import {Component, OnInit} from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ThingsService } from "../../things.service";
import { CommonService } from 'app/routes/common.service';

@Component({
  templateUrl: './tag-add-mutiple.html',
})
export class TagAddMutipleComponent implements OnInit {
  ngFileModel: any = {};
  file;

  constructor(private _common: CommonService,          
              private tagService: ThingsService,
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
    this.tagService.addTagMutiple(data)
      .subscribe(result => {
        console.log(result);
        this.message.success('添加成功');
        this.nzModal.triggerOk();
      });
  }
  downloadTemplate() {
    this._common.downloadTemplate("Tag.xls", "标签数据批量导入模板", (err) => {
      this.message.error('模板下载失败');
    });
  }
}
