import { Component, OnInit } from '@angular/core';
import { PostAddComponent } from './add/post-add.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { PostModifyComponent } from './mod/post-modify.component';
import { PostDetailComponent } from './detail/post-detail.components';
import { Page } from "../../../../models/page";
import { SYS_CONS } from "../../../../models/constant";
import { PostScheduleService } from "../post-schedule.service";

@Component({
  templateUrl: './post-manage.html',
})
export class PostManageComponent implements OnInit {
  formModel = {};
  page = new Page();
  dataSet = [];
  loading = false;
  postTypeList = SYS_CONS.POST_TYPE;

  constructor(
    private userService: PostScheduleService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  _refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const formData = {
      postName: this.formModel['postName'] || '',
      postType: this.formModel['postType'] || '',
    };
    const params = Object.assign({}, formData, this.page);
    console.log(params);
    this.userService.getPostByPage(params)
      .subscribe(_data => {
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        //this.page.curRow = _data['curRow'];
        this.page.totalPage = _data['totalPage'];
        this.loading = false;
      });
  }

  search() {
    this._refreshData(true);
  }

  ngOnInit(): void {
    // this.myAccount = this.session.userId;
    // this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
    this._refreshData(true);
  }

  deletePost(post) {
    this.userService.deletePost(post.postNo).subscribe(r => {
      this.message.success(
        `岗位删除成功`,
      );
      this._refreshData(true);
    }, (error) => {
      if (error instanceof HttpResponse) {
        this.message.error('仍有人员在该岗位，无法删除！');
      }
    });
  }

  modifyUser(item) {
    const modal = this.modal.create({
      nzTitle: '修改岗位',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: PostModifyComponent,
      nzComponentParams: {
        data: item,
      },
      nzOnOk: () => {
        this._refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  openAdd() {
    const modal = this.modal.create({
      nzTitle: '添加岗位',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: PostAddComponent,
      nzOnOk: () => {
        this._refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(modal);
  }

  openDetail(item) {
    const modal = this.modal.create({
      nzTitle: '岗位详情',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: PostDetailComponent,
      nzComponentParams: {
        data: item,
      },
      nzOnOk: () => {
        this._refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }
}
