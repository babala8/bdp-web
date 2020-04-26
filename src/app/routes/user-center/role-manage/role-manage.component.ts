import { Component, OnInit } from '@angular/core';
import { RoleManageService } from './role-manage.service';
import { Page } from '../../../models/page';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RoleAddComponent } from './add/role-add.component';
import { RoleModifyComponent } from './mod/role-modify.component';
import { RoleDetailComponent } from './detail/role-detail.component';
import { AppService } from '../../../app.service';
import { OrgManageService } from '../org-manage/org-manage.service';

@Component({
  templateUrl: './role-manage.html',
})
export class RoleManageComponent implements OnInit {

  formModel = {};
  dataSet = [];
  loading = false;
  page = new Page();
  orgGrades = [];

  constructor(private roleService: RoleManageService,
              private message: NzMessageService,
              private appService: AppService,
              private orgService: OrgManageService,
              private modal: NzModalService) {
  }

  ngOnInit() {

    //获取机构类型
    this.orgService.qryAllOrgTypes().subscribe( _data => {
      console.log(_data);
      this.orgGrades = _data.retList;
      this.refreshData();
    })
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const params = {
      orgGradeNo: this.formModel['orgGradeNo'] || '',
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
      curRow: this.page.curRow,
      totalPage: this.page.totalPage || '',
      totalRow: this.page.totalRow || '',
    };

    this.roleService.qryRolesByPages(params)
      .subscribe(_data => {
        const data = _data['retList'];
        data.forEach( el => {
          for(let i=0;i < this.orgGrades.length; i++) {
            if( el.orgGradeNo === this.orgGrades[i].no){
              el['gradeName'] = this.orgGrades[i].name
            }
          }
        })
        console.log(data);
        this.dataSet = data;

        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data.totalPage;
        this.loading = false;
        console.log(this.page);
      });
  }

  search() {
    this.refreshData(true);
    console.log(this.formModel);
  }

  delRole(item) {
    this.loading = true;
    this.roleService.delRole(item.no).subscribe(r => {
        this.loading = false;
        this.message.success(`角色已删除！`);
        this.refreshData(true);
      },
    );
  }

  modRole(role) {
    console.log(role);
    const modal = this.modal.create({
      nzTitle: '修改角色',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '50%',
      nzContent: RoleModifyComponent,
      nzComponentParams: {
        role: role,
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(modal);
  }

  openAdd() {
    const modal = this.modal.create({
      nzTitle: '添加角色',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '50%',
      nzContent: RoleAddComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(modal);
  }

  showDetail(role) {
    const modal = this.modal.create({
      nzTitle: '角色详细信息',
      nzFooter: null,
      nzWidth: '50%',
      nzMaskClosable: false,
      nzContent: RoleDetailComponent,
      nzComponentParams: {
        role: role,
      },
      nzOnOk: () => {
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(modal);
  }

}
